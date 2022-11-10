const express = require('express');
const controller = require('../controller/Cmain');
const router = express.Router();

// "경로 설정" = 라우팅
// 기본 경로: localhost:PORT/

// GET / => localhost:PORT/
router.get('/', controller.main);

// GET /comments => localhost:PORT/comments
router.get('/comments', controller.comments);

// GET /comment/:id => localhost:PORT/comment/:id
router.get('/comment/:id', controller.comment);

router.get('/loginpage', controller.loginPage);

router.post('/login', controller.login);

router.get('/signuppage', controller.signupPage);

router.post('/signup', controller.signup);

// module.exports 를 통해서 router 등록
// -> 다른 파일에서도 사용 가능
module.exports = router;