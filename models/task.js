const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],  
    required: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],  
    required: true
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
