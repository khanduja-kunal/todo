const sequelize = require('../db');
const Todo = require('./todo')(sequelize);
const User = require('./user')(sequelize);

User.hasMany(Todo, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Todo.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = { sequelize, Todo, User };