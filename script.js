document.getElementById('addTaskBtn').addEventListener('click', addTask);

let tasks = [];

function addTask() {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;

  if (!title || !description) {
    alert('Please provide both title and description');
    return;
  }

  const task = {
    id: tasks.length + 1,
    title: title,
    description: description,
    status: 'pending'
  };

  tasks.push(task);
  renderTasks();
  clearInputFields();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear current list

  tasks.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.innerHTML = `
      <strong>${task.title}</strong> - ${task.description} <br>
      Status: <span>${task.status}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskElement);
  });
}

function clearInputFields() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
}
