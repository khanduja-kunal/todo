const userRepository = require('../repositories/userRepository');

  module.exports = {
    async createUser({ username, password }) {
      if (!username || !password) {
        throw new Error('Username and password are required');
      }
      return await userRepository.create({ username, password });
    },

    async getAllUsers() {
      return await userRepository.findMany();
    },

    async deleteUser(id) {
      if (!id) {
        throw new Error('User ID is required');
      }
      await userRepository.delete(id);
    },
  };