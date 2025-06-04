const todoRepository = require('../repositories/todoRepository');

module.exports = {
  async createTodo({ userId, title, completed = false }) {
    if (!userId || !title) {
      throw new Error('User ID and title are required');
    }
    return await todoRepository.create({ title, userId });
  },
  async getTodoById(id) {
    if (!id) {
      throw new Error('Todo ID is required');
    }
    const todo = await todoRepository.findById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  },
  async getTodos() {
    return await todoRepository.findMany();
  },
  async updateTodo(id, updates) {
    if (!id) {
      throw new Error('ID is required');
    }
    if (!Object.keys(updates).length) {
      throw new Error('At least one update is required');
    }
    const updated = await todoRepository.update(id, updates);
    if (!updated) {
      throw new Error('Todo not found');
    }
    return updated;
  },
  async deleteTodo(id) {
    if (!id) {
      throw new Error('Todo ID is required');
    }
    await todoRepository.delete(id);
  },
};