const { docClient, USERS_TABLE, TODOS_TABLE } = require('../utils/dynamodbClient');
const { PutCommand, ScanCommand, DeleteCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
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

  async findMany() {
    const { Items } = await docClient.send(new ScanCommand({ TableName: USERS_TABLE }));
    return Items || [];
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

//const { docClient, USERS_TABLE } = require('../utils/dynamodbClient');
//const { PutItemCommand, ScanCommand, DeleteItemCommand } = require('@aws-sdk/lib-dynamodb');
//
//module.exports = {
//  async createUser(user) {
//    const command = new PutItemCommand({
//      TableName: USERS_TABLE,
//      Item: user,
//    });
//    await docClient.send(command);
//    return user;
//  },
//
//  async getAllUsers() {
//    const command = new ScanCommand({
//      TableName: USERS_TABLE,
//    });
//    const { Items } = await docClient.send(command);
//    return Items || [];
//  },
//
//  async deleteUser(id) {
//    const command = new DeleteItemCommand({
//      TableName: USERS_TABLE,
//      Key: { id },
//    });
//    await docClient.send(command);
//  },
//};