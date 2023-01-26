import './style.css';

let todoArr = [];

todoArr = JSON.parse(localStorage.getItem('todos')) || [];
const form = document.querySelector('form');

// add todo list

const addTodo = (userTask) => {
  todoArr.push({
    index: todoArr.length + 1,
    desc: userTask,
    completed: false,
  });
  localStorage.setItem('todos', JSON.stringify(todoArr) || []);
};

// update todo

const updateTask = (value, id) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const newArr = todos.findIndex((elem) => elem.index === id);
  todos[newArr].desc = value;
  localStorage.setItem('todos', JSON.stringify(todos) || []);
};

// remove item

const removeTodo = (id) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const newTodos = todos.filter((item) => item.index !== id);
  // newTodos.map((elem, index) => newTodos[index].id = index + 1);
  for (let i = 0; i < newTodos.length; i += 1) {
    newTodos[i].index = i + 1;
  }
  localStorage.setItem('todos', JSON.stringify(newTodos) || []);
  window.location.reload();
};

// get user input value

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userTask = document.getElementById('user-task').value;
  addTodo(userTask);
  document.getElementById('user-task').value = '';
  window.location.reload();
});

// display todo

const displayTodo = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const todoList = document.getElementById('todo-list');
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'ul-list');
  todos.forEach((todo) => {
    const li = document.createElement('li');
    const checkBox = document.createElement('input');
    const p = document.createElement('p');
    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('id', 'removeItem');
    removeBtn.setAttribute('class', 'delete-icon');
    checkBox.type = 'checkbox';
    p.setAttribute('class', 'list');
    p.setAttribute('id', todo.index);
    li.appendChild(checkBox);
    li.appendChild(p);
    li.appendChild(removeBtn);
    p.innerHTML += todo.desc;
    ul.appendChild(li);
    removeBtn.addEventListener('click', () => {
      removeTodo(todo.index);
    });
  });
  todoList.appendChild(ul);
};

displayTodo();

// make item editable

document.querySelectorAll('.list').forEach((item) => {
  item.addEventListener('click', (e) => {
    const list = document.getElementById(e.target.id);
    list.contentEditable = true;
    list.style.backgroundColor = '#f3f3f3';
    list.addEventListener('blur', (e) => {
      const val = e.target.innerText;
      updateTask(val, e.target.id);
      list.contentEditable = false;
      list.style.backgroundColor = 'white';
    });
  });
});
