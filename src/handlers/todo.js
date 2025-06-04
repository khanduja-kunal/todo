const TodoService = require('../services/todoService');
const { createResponse } = require('../utils/response');
const { handleError } = require('../utils/errorHandler');
module.exports.create = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const todo = await TodoService.createTodo(body);
    return createResponse(201, todo);
  } catch (error) {
    return handleError(error);
  }
};
module.exports.getById = async (event) => {
  try {
    const { id } = event.pathParameters || {};
    if (!id) {
      throw new Error('Path parameter "id" is required');
    }
    const todo = await TodoService.getTodoById(id);
    return createResponse(200, todo);
  } catch (error) {
    return handleError(error);
  }
};
module.exports.getAll = async (event) => {
  try {
    const todos = await TodoService.getTodos();
    return createResponse(200, todos);
  } catch (error) {
    return handleError(error);
  }
};
module.exports.update = async (event) => {
  try {
    const { id } = event.pathParameters || {};
    const body = JSON.parse(event.body || '{}');
    if (!id) {
      throw new Error('Path parameter "id" is required');
    }
    const updates = {};
    if (body.title) updates.title = body.title;
    if (typeof body.completed === 'boolean') updates.completed = body.completed;
    const updatedTodo = await TodoService.updateTodo(id, updates);
    return createResponse(200, updatedTodo);
  } catch (error) {
    return handleError(error);
  }
};
module.exports.delete = async (event) => {
  try {
    const { id } = event.pathParameters || {};
    if (!id) {
      throw new Error('Path parameter "id" is required');
    }
    await TodoService.deleteTodo(id);
    return createResponse(204, {});
  } catch (error) {
    return handleError(error);
  }
};