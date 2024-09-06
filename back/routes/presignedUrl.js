const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();
const s3 = new AWS.S3();

router.get('/getPresignedUrls', (req, res) => {
    const imageKeys = ['너의 이름은.jpg', '반지의 제왕-왕의 귀환.jpg', '어벤져스 엔드 게임.jpg', '인터스텔라.jpg'];
    const urls = imageKeys.map(key => s3.getSignedUrl('getObject', {
        Bucket: 'web-images-kmhyuk1018',
        Key: key,
        Expires: 1800
    }));
    res.json({ urls });
});


module.exports = router;
