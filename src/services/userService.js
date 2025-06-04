const userRepository = require('../repositories/userRepository');

module.exports = {
  async createUser({ username, password }) {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    return await userRepository.create({ username, password });
  },
  async getUserById(id) {
    if (!id) {
      throw new Error('User ID is required');
    }
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
  async getAllUsers() {
    return await userRepository.findMany();
  },
  async updateUser(id, updates) {
    if (!id) {
      throw new Error('User ID is required');
    }
    if (!updates.username && !updates.password) {
      throw new Error('At least one update (username or password) is required');
    }
    const updated = await userRepository.update(id, updates);
    if (!updated) {
      throw new Error('User not found');
    }
    return updated;
  },
  async deleteUser(id) {
    if (!id) {
      throw new Error('User ID is required');
    }
    await userRepository.delete(id);
  },
};