// // functions shortcut
// const d = document;
const print = (target, dir=false) => {
  dir ? console.dir(target) : console.log(target);
}
// const selector = (target, from=d) => {
//   return from.querySelector(target);
// }
// const selectorAll = (target, from=d) => {
//   return from.querySelectorAll(target);
// }
// const addClass = function (element, classStr) {
//   element.classList.add(classStr);
// };
// const removeClass = function (element, classStr) {
//   element.classList.remove(classStr);
// };
// const toggleClass = function (element, classStr) {
//   element.classList.toggle(classStr);
// };
// const hasClass = function (element, className) {
//   return element.classList.contains(className);
// };
// const clearClass = function (element) {
//   while (element.classList.length > 0) {
//     removeClass(element, element.classList.item(0));
//   }
// };
// const bakeCookie = (object, keys=null) => {
//   if (keys == null) {
//     keys = Array.from(Object.keys(object));
//   }
//   keys.forEach(element => {
//     d.cookie = `${element}=${object[element]}`;
//   });
// };
// const cookieObject = () => {
//   let object = {};
//   let pieces = d.cookie.split(';');
//   pieces.forEach(element => {
//     let splitIndex = element.indexOf('=');
//     object[element.slice(0, splitIndex)] = element.slice(splitIndex+1);
//   });
//   return object;
// };


exports.user = (req, res) => {
  // let cookieData = cookieObject();
  // if('r' in cookieData) {
  //   if(cookieData.r) {
  //     // res.render('user', {userInfo : cookieData});
  //     print(cookieData);
  //   }
  // }
  // alert("다시 로그인 해주세요");
  print(req.headers.cookie);
  res.render('user', {userInfo : {}});
};