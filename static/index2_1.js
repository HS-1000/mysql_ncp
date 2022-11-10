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

const submitAxios = () => {
  // let input = document.querySelector("#guest_book_input");
  const form = document.forms['guestBookInput'];
  if(!form.userName.checkValidity() || !form.comment.checkValidity()) {
    alert("이름과 내용을 확인해주세요. \n 이름은 최대 10자 입니다");
    return 0;
  }
  const data = {
    name : form.userName.value,
    comment : form.comment.value
  }
  form.userName.value = "";
  form.comment.value = "";
  axios({
    method : 'POST',
    url : '/hello/submit',
    params : data
  }).then(res => {
    let data = res.data[0];
    console.log(res);
    if (!data.id) {
      switch (data.errorId) {
        case 0 : 
          alert("이름을 입력하세요");
          break;
        case 1 :
          alert("내용을 입력하세요");
          break;
        case 2:
          alert("이름은 최대 10글자 입니다");
      }
      return 0;
    }
    let table = document.querySelector('#visitor_comments tbody');
    let tr = document.createElement('tr');
    let td_id = document.createElement('td');
    let td_writer = document.createElement('td');
    let td_text = document.createElement('td');
    let td_edit = document.createElement('td');
    let btn_edit = document.createElement('button');
    btn_edit.innerText = 'edit';
    addEditBtnListener(btn_edit);
    btn_edit.classList.add('edit_btn');
    td_edit.append(btn_edit);
    let td_delete = document.createElement('td');
    let btn_delete = document.createElement('button');
    btn_delete.innerText = 'delete';
    addDeleteBtnListener(btn_delete);
    btn_delete.classList.add('delete_btn');
    td_delete.append(btn_delete);
    td_id.innerText = data.id;
    td_writer.innerText = data.name;
    td_text.innerText = data.comment;
    tr.append(td_id);
    tr.append(td_writer);
    tr.append(td_text);
    tr.append(td_edit);
    tr.append(td_delete);
    table.append(tr);
    // insetAdjacentElement 함수로도 가능
  });
}

const addEditBtnListener = editBtn => {
  editBtn.addEventListener('click', () => {
    editComment(editBtn.parentNode.parentNode);
  });
}
const addDeleteBtnListener = deleteBtn => {
  deleteBtn.addEventListener('click', () => {
    deleteComment(deleteBtn.parentNode.parentNode);
    // parentNode여러번 대신 closest() 사용가능
  });
}
let editBtns = document.querySelectorAll('button.edit_btn');
editBtns.forEach(element => {addEditBtnListener(element)});
let deleteBtns = document.querySelectorAll('button.delete_btn');
deleteBtns.forEach(element => {addDeleteBtnListener(element)});
let cancelBtn = document.querySelector("#cancel_btn");
let editBtn = document.querySelector('#edit_btn');
cancelBtn.addEventListener('click', () => {
  cancelBtn.disabled = true;
  editBtn.disabled = true;
  cancelBtn.classList.add("disabled_btn");
  editBtn.classList.add("disabled_btn");
  document.querySelector("#user_name").value = "";
  document.querySelector("#comment").value = "";
});

const editComment = tableTr => {
  let targetName = document.querySelector("#user_name");
  let targetText = document.querySelector("#comment");
  let editBtn = document.querySelector("#edit_btn");
  let cancelBtn = document.querySelector("#cancel_btn");
  let trData = tableTr.querySelectorAll("td");
  targetName.value = trData[1].innerText;
  targetText.value = trData[2].innerText;
  editBtn.disabled = false;
  editBtn.classList.remove("disabled_btn");
  cancelBtn.disabled = false;
  cancelBtn.classList.remove("disabled_btn");
  editBtn.addEventListener('click', () => {
    const form = document.forms['guestBookInput'];
    if(!form.userName.checkValidity() || !form.comment.checkValidity()) {
      alert("이름과 내용을 확인해주세요. \n 이름은 최대 10자 입니다");
      return 0;
    }
    data = {
      id : Number(tableTr.querySelector("td").innerText),
      name : targetName.value,
      comment : targetText.value
    };
    axios({
      method : "POST",
      url : "/hello/edit",
      params : data
    }).then(res => {
      if (!res.data.id) {
        switch (res.data.errorId) {
          case 0 : 
            alert("이름을 입력하세요");
            break;
          case 1 :
            alert("내용을 입력하세요");
            break;
          case 2:
            alert("이름은 최대 10글자 입니다");
        }
        return 0;
      }
      editBtn.disabled = true;
      cancelBtn.disabled = true;
      editBtn.classList.add("disabled_btn");
      cancelBtn.classList.add("disabled_btn");    
      trData[1].innerText = data.name;
      trData[2].innerText = data.comment;
      targetName.value = "";
      targetText.value = "";
    });

  });
}

const deleteComment = tableTr => {
  if(!confirm("삭제합니까?")) {
    return 1;
  }
  let idNum = Number(tableTr.querySelector("td").innerText);
  axios({
    method : "DELETE",
    url : "/hello/delete_comment",
    data : {
      id : idNum
    }
  }).then(res => {
    alert(res.data);
  });
  tableTr.remove();
}

console.log(document.cookie);
