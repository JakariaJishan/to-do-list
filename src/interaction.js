// update todo

const updateTask = (value, id) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const newArr = todos.findIndex((elem) => elem.index === Number(id));
  todos[newArr].desc = value;
  localStorage.setItem('todos', JSON.stringify(todos) || []);
};

// remove item

const removeTodo = (id) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const newTodos = todos.filter((item) => item.index !== id);
  for (let i = 0; i < newTodos.length; i += 1) {
    newTodos[i].index = i + 1;
  }
  localStorage.setItem('todos', JSON.stringify(newTodos) || []);
  window.location.reload();
};

// mark complete or uncomplete

const markComplete = (id, check) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos.forEach((item, ind) => {
    if (item.index === Number(id)) {
      todos[ind].completed = check;
      todos[ind].index = ind + 1;
    }
  });
  localStorage.setItem('todos', JSON.stringify(todos) || []);
};
// clear all completed mark

const clearCompleted = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const completedTodos = todos.filter((item) => item.completed !== true);
  for (let i = 0; i < completedTodos.length; i += 1) {
    completedTodos[i].index = i + 1;
  }
  localStorage.setItem('todos', JSON.stringify(completedTodos) || []);
  window.location.reload();
};
export {
  markComplete, clearCompleted, updateTask, removeTodo,
};
