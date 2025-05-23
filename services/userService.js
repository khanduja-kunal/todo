const { User } = require('../models');

const getAllUsers = async () => {
  return await User.findAll({ order: [['id', 'ASC']] });
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const createUser = async (username, email) => {
  return await User.create({ username, email });
};

const updateUser = async (id, username, email) => {
  const [updatedCount, updatedUsers] = await User.update(
    { username, email },
    { where: { id }, returning: true }
  );
  return updatedCount > 0 ? updatedUsers[0] : null;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};