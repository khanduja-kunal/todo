const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const isLocal = process.env.IS_OFFLINE === 'true';

const client = new DynamoDBClient({
  region: isLocal ? 'localhost' : 'us-east-1',
    ...(isLocal && {
      endpoint: 'http://localhost:8000',
      credentials: {
      accessKeyId: 'dummy',
      secretAccessKey: 'dummy',
      },
    }),
});

const docClient = DynamoDBDocumentClient.from(client);

module.exports = {
  docClient,
  USERS_TABLE: process.env.USERS_TABLE,
  TODOS_TABLE: process.env.TODOS_TABLE,
};