const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });

const cognito = new AWS.CognitoIdentityServiceProvider();

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  try {
    const result = await cognito.signUp(params).promise();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign up' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const result = await cognito.initiateAuth(params).promise();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};
