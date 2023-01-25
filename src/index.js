import "./style.css";

let todoArr = [];

todoArr = JSON.parse(localStorage.getItem("todos")) || [];
let form = document.querySelector("form");

let addTodo = (userTask) => {
  todoArr.push({
    id: todoArr.length + 1,
    desc: userTask,
    completed: false,
  });
  localStorage.setItem("todos", JSON.stringify(todoArr) || []);
};

let updateTask = (value,id) =>{
  let todos = JSON.parse(localStorage.getItem('todos'));
  let newArr = todos.findIndex(elem => elem.id == id)
  todos[newArr].desc= value
  localStorage.setItem("todos", JSON.stringify(todos) || []);

}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userTask = document.getElementById("user-task").value;
  addTodo(userTask);
  document.getElementById("user-task").value = "";
  displayTodo();
});

let displayTodo = () => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoList = document.getElementById("todo-list");
  let ul = document.createElement('ul')
  ul.setAttribute('class', 'ul-list')
  todos.forEach((todo) => {
    let li = document.createElement('li');
    li.setAttribute('class', 'list')
    li.setAttribute('id', todo.id)
    li.innerHTML += todo.desc
    ul.appendChild(li)
  });
  todoList.appendChild(ul) ;
};

displayTodo();


document.querySelectorAll('.list').forEach(item => {
  item.addEventListener('click', (e)=>{
    let x = document.getElementById(e.target.id);
    x.contentEditable = true
    x.addEventListener('blur', (e)=>{
      let val = e.target.innerHTML
      updateTask(val,e.target.id)
      x.contentEditable = false
    })
  })
})
// let listItem = document.querySelectorAll(".todo-list-item");
// let p = document.querySelector('.list-text')
// listItem.forEach(item => {
//   item.addEventListener("click", (e) => {
//     item.style.background = "#f3f3f3";
    
//     console.log(p.id);
//   });
// })
