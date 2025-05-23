'use strict';
       module.exports = {
         up: async (queryInterface, Sequelize) => {
           await queryInterface.createTable('users', {
             id: {
               allowNull: false,
               autoIncrement: true,
               primaryKey: true,
               type: Sequelize.INTEGER,
             },
             username: {
               type: Sequelize.STRING,
               allowNull: false,
               unique: true,
             },
             email: {
               type: Sequelize.STRING,
               allowNull: false,
               unique: true,
             },
           });
         },
         down: async (queryInterface, Sequelize) => {
           await queryInterface.dropTable('users');
         },
       };