const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // Middleware to parse JSON data

// In-memory database (tasks)
let tasks = [];
let currentId = 1;

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const newTask = {
    id: currentId++,
    title,
    description,
    status: 'pending'
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /tasks - Fetch all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id - Fetch a task by its ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.status(200).json(task);
});

// PUT /tasks/:id - Update the task status
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { status } = req.body;

  if (!['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.status = status;
  res.status(200).json(task);
});

// DELETE /tasks/:id - Delete a task by its ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
