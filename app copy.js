const express = require('express');
const app = express();
const PORT = 8000;
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const upload = multer({
  dest: 'uploads/'
});

let fileNameTemp;
const uploadDetail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/')
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      fileNameTemp = path.basename(file.originalname, ext) + Date.now() + ext;
      done(null, fileNameTemp);
    }
  }),
  limits: {fileSize: 5*1024*1024}
});
const uploadById = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/')
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      fileNameTemp = req.body.userId + Date.now() + ext;
      done(null, fileNameTemp);
    }
  }),
  limits: {fileSize: 5*1024*1024}
});

app.set('view engine', 'ejs');
// Middleware 설정
// 요청과 응답 중간에서 작업
app.use('/views', express.static(__dirname + '/views')); // views 파일 설정
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use('/uploads', express.static(__dirname + '/uploads'));
//프론트에서 접근 하려면

app.get('/', function(req, res) {
  res.render('index1', {title:'title'});
  // 
});

const comments = [
  {
    id : 1,
    userid : 'tom',
    date : '2022-11-02',
    comment : 'hello'
  },
  {
    id : 2,
    userid : 'jerry',
    date : '2022-11-03',
    comment : '안녕하살법 ^~^ '
  },
  {
    id : 3,
    userid : 'asdf',
    date : '2022-11-03',
    comment : 'asdfsadfasdfasdf'
  },
  {
    id : 4,
    userid : 'meow',
    date : '2022-11-07',
    comment : 'meow~'
  }
]

app.get('/comments', (req, res) => {
  res.render('comments', {commentInfos : comments});
});
app.get('/comment/:id', (req, res) => {
  let commentId = Number(req.params.id);
  if (commentId != req.params.id) {
    return res.render('404', {errorInfo : 'id type error'});
  }
  else if (commentId < 0 || commentId > comments.length) {
    return res.render('404', {errorInfo : 'comments index out of range'});
  }
  commentId--;
  res.render('comment', comments[commentId]);
});
// url에서 :id는 id를 변수처럼 사용가능


app.get('/getReturnAll', (req, res) => {
  res.send(req.query);
});
app.get('/fileList', (req, res) => {
  let answer = fs.readdirSync('uploads/');
  res.send({data : answer});
});

app.post('/postReturnAll', (req, res) => {
  res.send(req.body);
});
app.post('/upload', uploadDetail.single('inputFile'), (req, res) => {
  // single의 인자 -> ejs의 input의 name
  // single() -> req.file객체에 파일 정보
  console.log(req.file);
  console.log(req.body);
  res.send('Upload');
});
app.post('/upload/array', uploadDetail.array('userfiles'), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.send('upload');
});
app.post('/upload/fields', uploadDetail.fields([{name:'userfile1'},{name:'userfile2'},{name:'userfile3'},{name:'userfile4'},{name:'userfile5'}]), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.send('upload');
});
app.post('/dyFile', uploadDetail.single('userfileAxios'), (req, res) => {
  res.send(req.file);
});
app.post('/axiosLogin', (req, res) => {
  ((req.query.id == id) && (req.query.pw == pw)) ? res.send({"r":true}) : res.send({"r":false});
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.get('*', (req, res) => {
  res.render("404", {errorInfo : "Not found"});
});