const express = require('express');
const controller = require('../controller/Cuser');
const router = express.Router();

// 기본경로 : localhost:PORT/user

router.get('/', controller.user);



module.exports = router;