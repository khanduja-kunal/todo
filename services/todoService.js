const prisma = require('../db');

const getTodos = async () => {
  return prisma.todo.findMany({
    include: { users: true },
  });
};

const getTodoById = async (id) => {
  return prisma.todo.findUnique({
    where: { id: parseInt(id) },
    include: { users: true },
  });
};

const createTodo = async (title, userId) => {
  return prisma.todo.create({
    data: {
      title,
      userId,
    },
    include: { users: true },
  });
};

const updateTodo = async (id, data) => {
  return prisma.todo.update({
    where: { id: parseInt(id) },
    data,
    include: { users: true },
  });
};

const deleteTodo = async (id) => {
  return prisma.todo.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};