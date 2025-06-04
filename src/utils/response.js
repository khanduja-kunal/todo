const defaultHeaders = {
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
};

const createResponse = (statusCode, body, customHeaders = {}) => ({
  statusCode,
  headers: { ...defaultHeaders, ...customHeaders },
  body: typeof body === 'string' ? body : JSON.stringify(body),
});

module.exports = { createResponse };