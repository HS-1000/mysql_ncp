const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MVC 패턴 적용
// ./routes/index: index는 생략 가능
const indexRouter = require('./routes/index');
// localhost:PORT/ 경로를 기본으로 ./routes/index.js 파일에 선언한 대로 동작
app.use('/', indexRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);
// /user에서 user.js에 선언한대로 동작

const mvc_mysql = require('./routes/mvc_mysql');
app.use('/hello', mvc_mysql);


app.get('*', (req, res) => {
  res.render('404', {errorInfo : "undefined"});
});

app.listen(PORT, () => {
  console.log(`PORT number : ${PORT}`);
});