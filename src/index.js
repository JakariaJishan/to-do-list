import './style.css';

const todos = [
  {
    desc: 'todo 1',
    completed: false,
    index: 0,
  },
  {
    desc: 'todo 2',
    completed: false,
    index: 1,
  },
  {
    desc: 'todo 3',
    completed: true,
    index: 3,
  },
];
const todoList = document.getElementById('todo-list');
const ul = document.createElement('ul');
todos.forEach((todo) => {
  const li = document.createElement('li');
  let list = '';
  list += ` <div class='list'><input type="checkbox"><p>${todo.desc}</p></div> <div class="edit-icon"></div>
  `;
  li.innerHTML = list;
  ul.appendChild(li);
});
todoList.appendChild(ul);
