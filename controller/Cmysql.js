const Visitor = require('../model/Visitor');

exports.main = (req, res) => {
  res.render('index2');
}

exports.guestBook = (req, res) => {
  Visitor.getVisitors((data) => {
    res.render('index2_1', {guestBooks : data});
  });
}

exports.submit = (req, res) => {
  Visitor.addVisitor(req.query, (data) => {
    res.send(data);
  });
}

exports.deleteVisitor = (req, res) => {
  Visitor.deleteVisitor(req.body.id, (result) => {
    res.send("Delete successful");
  });
}

exports.editComment = (req, res) => {
  Visitor.editComment(req.query, (data) => {
    res.send(data);
  });
}
// exports.submit = (req, res) => {
//   let data = req.query;
//   data.id = 123; // 수정
//   res.send(data);
// }