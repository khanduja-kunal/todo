const todoService = require('../services/todoService');

const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoService.getTodoById(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, userId } = req.body;
    if (!title || !userId) return res.status(400).json({ error: 'Title and userId required' });
    const todo = await todoService.createTodo(title, userId);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await todoService.updateTodo(id, { title, completed });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoService.deleteTodo(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTodos,
  getTodo,
  addTodo,
  updateTodoById,
  deleteTodoById,
};