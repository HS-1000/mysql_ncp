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

let sighupBtn = selector("#submit");
sighupBtn.addEventListener('click', () => {
  const form = d.forms['signup'];
  console.log(form);
  if (!form.userid.checkValidity()) {
    alert('아이디를 확인해주세요\n최대 20글자 입니다');
    return 1;
  } else if (!form.name.checkValidity()) {
    alert('이름을 확인해주세요\n최대 10글자 입니다');
    return 1;
  } else if (!form.pw.checkValidity()) {
    alert('패스워드를 확인해주세요\n최대 20글자 입니다');
    return 1;
  } else if (form.pw.value != form.pw_check.value) {
    alert('입력한 두 패스워드가 불일치 합니다');
    return 1;
  }
  let data = {
    userid : form.userid.value,
    name : form.name.value,
    pw : form.pw.value
  }
  axios({
    method : "POST",
    url : "signup",
    params : data
  }).then((res) => {
    console.log(res.data);
    if(res.data) {
      alert(`${form.name.value}님 환영합니다`);
    } else {
      alert("지금 회원가입이 불가합니다");
    }
    location.replace("http://localhost:8000/loginpage");
  });

});


console.log(document.cookie);
