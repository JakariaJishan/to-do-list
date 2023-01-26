import {
  clearCompleted, markComplete, removeTodo, updateTask,
} from './interaction.js';
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
    checkBox.addEventListener('change', (e) => {
      markComplete(todo.index, e.target.checked);
    });
  });
  todoList.appendChild(ul);

  document.getElementById('clear-all-completed').addEventListener('click', () => {
    clearCompleted();
  });
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

window.onload = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  for (let i = 0; i < todos.length; i += 1) {
    todos[i].completed = false;
  }
  localStorage.setItem('todos', JSON.stringify(todos) || []);
};