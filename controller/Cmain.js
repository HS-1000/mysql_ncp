
const Comment = require('../model/Comment');
const Login = require('../model/Login');
const comments = Comment.commentInfos();
// console.log(comments);
// console.log(Comment.commentInfos());




exports.main = (req, res) => {
  res.render('index1');
};

exports.comments = (req, res) => {
  // { commentInfos: [ {}, {}, {}, {} ]}
  res.render('comments', { commentInfos: comments });
};

exports.comment = (req, res) => {
  let commentId = Number(req.params.id);
  if (commentId != req.params.id) {
    return res.render('404', {errorInfo : 'id type error'});
  }
  else if (commentId < 0 || commentId > comments.length) {
    return res.render('404', {errorInfo : 'comments index out of range'});
  }
  commentId--;
  res.render('comment', comments[commentId]);
};

exports.login = (req, res) => {
  Login.login(req.query, (result) => {
    if(!result.length) {
      res.send({'r' : false});
      return 1;
    }
    if(req.query.pw == result[0].pw) {
      let data = result[0];
      data.r = true;
      res.send(data);
    } else {
      res.send({'r' : false});
    }
  });
};

exports.loginPage = (req, res) => {
  // if(req.isLogin) {
  // // 다른 화면 렌더
  //  return 0;
  // }
  res.render('login');
}

exports.signup = (req, res) => {
  Login.signup(req.query, () => {
    res.send(req.query);
  })
};

exports.signupPage = (req, res) => {
  res.render('signup');
}