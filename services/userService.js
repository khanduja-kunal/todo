const prisma = require('../db');

const getUsers = async () => {
  return prisma.user.findMany({
    include: { todos: true },
  });
};

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { todos: true },
  });
};

const createUser = async (username, email) => {
  return prisma.user.create({
    data: {
      username,
      email,
    },
  });
};

const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id: parseInt(id) },
    data,
    include: { todos: true },
  });
};

const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};