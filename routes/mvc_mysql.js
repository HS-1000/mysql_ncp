const express = require('express');
const controller = require('../controller/Cmysql');
const router = express.Router();

router.get('/', controller.main);

router.get('/guest_book', controller.guestBook);

router.post('/submit', controller.submit);

router.delete('/delete_comment', controller.deleteVisitor);

router.post('/edit', controller.editComment);

module.exports = router;