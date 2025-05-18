const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo'); // This is enough
require('dotenv').config();

const todoRoutes = require('./routes/todoRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

// Your routes can be in todoRoutes.js, but if you're using inline routes for now:
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find(); // Fetch all todos from MongoDB
    res.json(todos); // Send them back as JSON
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error while fetching todos' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
