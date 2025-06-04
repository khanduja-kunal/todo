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

module.exports.getAll = async () => {
  try {
    const users = await UserService.getAllUsers();
    return createResponse(200, users);
  } catch (error) {
    return handleError(error);
  }
};

module.exports.delete = async (event) => {
  try {
    const { id } = event.pathParameters || {};
    await UserService.deleteUser(id);
    return createResponse(204, '');
  } catch (error) {
    return handleError(error);
  }
};