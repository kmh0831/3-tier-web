const express = require('express');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// AWS Cognito 설정
AWS.config.update({
  region: process.env.AWS_REGION, // AWS 리전 설정
});

const cognito = new AWS.CognitoIdentityServiceProvider();

// 회원가입 API
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: email,
    TemporaryPassword: password,
    MessageAction: 'SUPPRESS',  // 이메일 억제
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'email_verified', Value: 'true' },  // 이메일 인증 확인
      { Name: 'name', Value: name },
    ],
  };

  try {
    // Cognito로 회원가입 요청
    const data = await cognito.adminCreateUser(params).promise();

    // 사용자를 자동으로 확인 처리
    const confirmParams = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: email,
    };

    await cognito.adminConfirmSignUp(confirmParams).promise(); // 사용자 자동 확인

    res.json({ message: 'User signed up and confirmed successfully', data });
  } catch (error) {
    console.error('Error during Cognito signup:', error);
    res.status(500).json({ error: error.message });
  }
});

// JWT 토큰에서 사용자 ID 추출 함수
function getUserIdFromToken(authHeader) {
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.decode(token); // 토큰을 디코드하여 사용자 정보 추출
    return decoded.sub;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

// 사용자 정보 조회 API
router.get('/me', async (req, res) => {
  const userId = getUserIdFromToken(req.headers.authorization);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID, // Cognito 사용자 풀 ID
    Username: userId, // 사용자 ID (sub 값)
  };

  try {
    const userData = await cognito.adminGetUser(params).promise();
    res.json({
      email: userData.UserAttributes.find(attr => attr.Name === 'email').Value,
      name: userData.UserAttributes.find(attr => attr.Name === 'name').Value,
    });
  } catch (error) {
    console.error('Failed to get user data from Cognito:', error);
    res.status(500).json({ error: 'Failed to retrieve user data' });
  }
});

module.exports = router;
