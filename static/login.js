// functions shortcut
const d = document;
const print = (target, dir=false) => {
  dir ? console.dir(target) : console.log(target);
}
const selector = (target, from=d) => {
  return from.querySelector(target);
}
const selectorAll = (target, from=d) => {
  return from.querySelectorAll(target);
}
const addClass = function (element, classStr) {
  element.classList.add(classStr);
};
const removeClass = function (element, classStr) {
  element.classList.remove(classStr);
};
const toggleClass = function (element, classStr) {
  element.classList.toggle(classStr);
};
const hasClass = function (element, className) {
  return element.classList.contains(className);
};
const clearClass = function (element) {
  while (element.classList.length > 0) {
    removeClass(element, element.classList.item(0));
  }
};
const bakeCookie = (object, keys=null) => {
  if (keys == null) {
    keys = Array.from(Object.keys(object));
  }
  keys.forEach(element => {
    d.cookie = `${element}=${object[element]}`;
  });
};
const cookieObject = () => {
  let object = {};
  let pieces = d.cookie.split(';');
  pieces.forEach(element => {
    let splitIndex = element.indexOf('=');
    object[element.slice(0, splitIndex)] = element.slice(splitIndex+1);
  });
  return object;
};

selector("#login_input button").addEventListener('click', () => {
  const form = d.forms['loginInput'];
  if(!form.idInput.checkValidity() || !form.pwInput.checkValidity()) {
    alert("아이디와 비밀번호를 확인하세요");
    return 0;
  }
  const data = {
    userid : form.idInput.value,
    pw : form.pwInput.value
  }
  form.idInput.value = "";
  form.pwInput.value = "";
  axios({
    method : 'POST',
    url : '/login',
    params : data
  }).then(res => {
    let data = res.data;
    bakeCookie(data);
    if(!data.r) {
      alert("아이디와 비밀번호를 확인하세요!");
      return 1;
    }
    alert(`"${data.name}"님 환영합니다!`);
    location.replace("http://localhost:8000/");
  });
});

