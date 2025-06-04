const { docClient, TODOS_TABLE } = require('../utils/dynamodbClient');
const { PutCommand, GetCommand, ScanCommand, UpdateCommand, QueryCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');
class TodoRepository {
  async create({ title, userId }) {
    const id = uuidv4();
    const now = new Date().toISOString();
    const params = {
      TableName: TODOS_TABLE,
      Item: { id, title, userId, completed: false, createdAt: now, updatedAt: now },
    };
    await docClient.send(new PutCommand(params));
    return { id, title, userId, completed: false, createdAt: now, updatedAt: now };
  }
  async findById(id) {
    const params = {
      TableName: TODOS_TABLE,
      Key: { id },
    };
    const { Item } = await docClient.send(new GetCommand(params));
    return Item || null;
  }
  async findMany() {
    const { Items } = await docClient.send(new ScanCommand({ TableName: TODOS_TABLE }));
    return Items || [];
  }
  async findByUserId(userId) {
    const params = {
      TableName: TODOS_TABLE,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId },
    };
    const { Items } = await docClient.send(new QueryCommand(params));
    return Items || [];
  }
  async update(id, updates) {
    const updateExpression = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};
    if (updates.title) {
      updateExpression.push('#title = :title');
      expressionAttributeValues[':title'] = updates.title;
      expressionAttributeNames['#title'] = 'title';
    }
    if (typeof updates.completed === 'boolean') {
      updateExpression.push('#completed = :completed');
      expressionAttributeValues[':completed'] = updates.completed;
      expressionAttributeNames['#completed'] = 'completed';
    }
    updateExpression.push('#updatedAt = :updatedAt');
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    const params = {
      TableName: TODOS_TABLE,
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
    const params = {
      TableName: TODOS_TABLE,
      Key: { id },
      ConditionExpression: 'attribute_exists(id)',
    };
    try {
      await docClient.send(new DeleteCommand(params));
    } catch (error) {
      if (error.name === 'ConditionalCheckFailedException') {
        throw new Error('Todo not found');
      }
      throw error;
    }
  }
}
module.exports = new TodoRepository();