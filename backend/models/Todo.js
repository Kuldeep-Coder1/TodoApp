// models/Todo.js
const mongoose = require('mongoose');

// Define schema
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export model
module.exports = mongoose.model('Todo', todoSchema);
