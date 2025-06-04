const UserService = require('../services/userService');
const { createResponse } = require('../utils/response');
const { handleError } = require('../utils/errorHandler');
module.exports.create = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const user = await UserService.createUser(body);
    return createResponse(201, user);
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
    const user = await UserService.getUserById(id);
    return createResponse(200, user);
  } catch (error) {
    return handleError(error);
  }
};
module.exports.getAll = async (event) => {
  try {
    const users = await UserService.getAllUsers();
    return createResponse(200, users);
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
    if (body.username) updates.username = body.username;
    if (body.password) updates.password = body.password;
    const updatedUser = await UserService.updateUser(id, updates);
    return createResponse(200, updatedUser);
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
    await UserService.deleteUser(id);
    return createResponse(204, {});
  } catch (error) {
    return handleError(error);
  }
};