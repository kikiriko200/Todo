let $=(selector)=> document.querySelector(selector);
let taskArray = [];
if(localStorage['tasks']){
  let localData = JSON.parse(localStorage['tasks']);
  for(let i = 0; i < localData.length; i++){
    taskArray.push(localData[i]);
  }
  for(let i = 0; i < taskArray.length; i++){
    addItem(taskArray[i]);
  }
}
//タスク追加
$('#form').addEventListener('submit', (event) => {
  let task = $("#taskName").value;
  if (task === ''){
    alert('文字入力しろ');
  }else{
    if(localStorage['tasks']){
      taskArray = [];
      let localData = JSON.parse(localStorage['tasks']);
      for(let i = 0;i < localData.length; i++){
        taskArray.push(localData[i]);
      }
      taskArray.push(task);
      let pushData = JSON.stringify(taskArray)
      localStorage.setItem('tasks',pushData);
    }else{
      let pushData = JSON.stringify(task)
      taskArray.push(pushData);
      localStorage.setItem('tasks',taskArray);
    }
    addItem(task);
  }
});

function addItem(liText) {
  let li = document.createElement("li");
  li.innerText = liText;
  li.classList.add("content","item");
  $("#contents").appendChild(li);
  $("#taskName").value = '';

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.classList.add("deleteButton","button","is-danger","is-small","mx-2");
  deleteButton.addEventListener("click",function(){
    let deleteText = deleteButton.parentNode.innerText.slice('0','-2')
    let deleteTextIndex = taskArray.indexOf(deleteText);
    taskArray.splice(deleteTextIndex, 1);
    localStorage.clear();
    let pushData = JSON.stringify(taskArray);
    localStorage.setItem('tasks',pushData);
    deleteButton.parentNode.remove();
  });
  li.appendChild(deleteButton);
}

//URL作成
function createURL() {
  let contents = document.querySelectorAll('ul .content');
  let array = [];
  let URL = 'https://twitter.com/intent/tweet?text=';
  for (let i = 0; i < contents.length; i++) {
    let content = contents[i].textContent.replace("削除","");
    array.push(content);
  };
  array = array.join();
  URL += array;
  $("#url").innerText = '';
  $("#url").innerText = URL;
  $("#link").href = encodeURI(URL);
}
