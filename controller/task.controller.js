const Task = require('../models/task');

exports.createTask = async (req, res) => {
    try {
      const { title, description, startTime, endTime, status, priority } = req.body;
 
      if (!title || !description || !status || !priority) {
        return res.status(400).json({ message: 'Title, description, status, and priority are required' });
      }
  
      const newTask = new Task({
        title,
        description,
        startTime: startTime || null,  
        endTime: endTime || null,      
        status,
        priority,
      });
  
      const task = await newTask.save();
  
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Server error, task could not be created' });
    }
  };

exports.getAllTasks = async (req, res) => {
  try {
    let tasks = await Task.find();
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },  
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
