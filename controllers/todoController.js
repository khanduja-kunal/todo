const todoModel = require('../models/todoModel');

const getAllTodos = async (req, res) => {
  try {
    const todos = await todoModel.getAllTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await todoModel.getTodoById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const newTodo = await todoModel.createTodo(title);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    if (title === undefined || completed === undefined) {
      return res.status(400).json({ error: 'Title and completed fields are required' });
    }
    const updatedTodo = await todoModel.updateTodo(req.params.id, title, completed);
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await todoModel.deleteTodo(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
