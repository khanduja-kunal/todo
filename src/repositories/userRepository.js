const { docClient, USERS_TABLE, TODOS_TABLE } = require('../utils/dynamodbClient');
const { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');
class UserRepository {
  async create({ username, password }) {
    const id = uuidv4();
    const now = new Date().toISOString();
    const params = {
      TableName: USERS_TABLE,
      Item: { id, username, password, createdAt: now, updatedAt: now },
    };
    await docClient.send(new PutCommand(params));
    return { id, username, createdAt: now, updatedAt: now };
  }
  async findById(id) {
    const params = {
      TableName: USERS_TABLE,
      Key: { id },
    };
    const { Item } = await docClient.send(new GetCommand(params));
    return Item || null;
  }
  async findMany() {
    const { Items } = await docClient.send(new ScanCommand({ TableName: USERS_TABLE }));
    return Items || [];
  }
  async update(id, updates) {
    const updateExpression = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};
    if (updates.username) {
      updateExpression.push('#username = :username');
      expressionAttributeValues[':username'] = updates.username;
      expressionAttributeNames['#username'] = 'username';
    }
    if (updates.password) {
      updateExpression.push('#password = :password');
      expressionAttributeValues[':password'] = updates.password;
      expressionAttributeNames['#password'] = 'password';
    }
    updateExpression.push('#updatedAt = :updatedAt');
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    const params = {
      TableName: USERS_TABLE,
      Key: { id },
      UpdateExpression: 'SET ' + updateExpression.join(', '),
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: 'ALL_NEW',
      ConditionExpression: 'attribute_exists(id)',
    };
    try {
      const { Attributes } = await docClient.send(new UpdateCommand(params));
      return Attributes;
    } catch (error) {
      if (error.name === 'ConditionalCheckFailedException') return null;
      throw error;
    }
  }
  async delete(id) {
    await docClient.send(new DeleteCommand({ TableName: USERS_TABLE, Key: { id } }));
    const todoParams = {
      TableName: TODOS_TABLE,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': id },
    };
    const { Items } = await docClient.send(new QueryCommand(todoParams));
    for (const todo of Items || []) {
      await docClient.send(new DeleteCommand({ TableName: TODOS_TABLE, Key: { id: todo.id } }));
    }
    const { Items: remaining } = await docClient.send(new QueryCommand(todoParams));
    if (remaining?.length > 0) {
      throw new Error('Failed to delete associated todos');
    }
  }
}
module.exports = new UserRepository();