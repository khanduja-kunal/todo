const { DataTypes } = require('sequelize');

     module.exports = (sequelize) => {
       const Todo = sequelize.define('Todo', {
         id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true,
         },
         title: {
           type: DataTypes.STRING,
           allowNull: false,
         },
         completed: {
           type: DataTypes.BOOLEAN,
           defaultValue: false,
         },
         userId: {
           type: DataTypes.INTEGER,
           allowNull: false,
         },
       }, {
         tableName: 'todos',
         timestamps: false,
       });

       return Todo;
     };