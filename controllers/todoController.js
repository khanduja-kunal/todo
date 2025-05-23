const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../services/todoService');

const getTodos = async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTodo = async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, userId } = req.body;
    if (!title || !userId) {
      return res.status(400).json({ error: 'Title and userId are required' });
    }
    const user = await require('../services/userService').getUserById(userId);
    if (!user) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    const todo = await createTodo(title, userId);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTodoById = async (req, res) => {
  try {
    const { title, completed, userId } = req.body;
    const todo = await updateTodo(req.params.id, title, completed, userId);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTodoById = async (req, res) => {
  try {
    const todo = await deleteTodo(req.params.id);
    if (todo) {
      res.json({ message: 'Todo deleted', todo });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getTodos,
  getTodo,
  addTodo,
  updateTodoById,
  deleteTodoById,
};