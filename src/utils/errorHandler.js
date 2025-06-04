const { createResponse } = require('./response');

module.exports.handleError = (error) => {
  console.error(error);
  const statusCode = error.message.includes('Missing') ? 400 :
                     error.message.includes('not found') ? 404 :
                     error.message.includes('already exists') ? 409 : 500;
  return createResponse(statusCode, { error: error.message });
};