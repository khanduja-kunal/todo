const { Todo, User } = require('../models');

const getAllTodos = async () => {
  return await Todo.findAll({
    order: [['id', 'ASC']],
    include: [{ model: User, attributes: ['username', 'email'] }],
  });
};

const getTodoById = async (id) => {
  return await Todo.findByPk(id, {
    include: [{ model: User, attributes: ['username', 'email'] }],
  });
};

const createTodo = async (title, userId) => {
  return await Todo.create({ title, userId });
};

const updateTodo = async (id, title, completed, userId) => {
  const [updatedCount, updatedTodos] = await Todo.update(
    { title, completed, userId },
    { where: { id }, returning: true }
  );
  return updatedCount > 0 ? updatedTodos[0] : null;
};

const deleteTodo = async (id) => {
  const todo = await Todo.findByPk(id);
  if (todo) {
    await todo.destroy();
    return todo;
  }
  return null;
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};