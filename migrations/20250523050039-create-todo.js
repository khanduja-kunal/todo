'use strict';
       module.exports = {
         up: async (queryInterface, Sequelize) => {
           await queryInterface.createTable('todos', {
             id: {
               allowNull: false,
               autoIncrement: true,
               primaryKey: true,
               type: Sequelize.INTEGER,
             },
             title: {
               type: Sequelize.STRING,
               allowNull: false,
             },
             completed: {
               type: Sequelize.BOOLEAN,
               defaultValue: false,
             },
             userId: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                 model: 'users',
                 key: 'id',
               },
               onDelete: 'CASCADE',
               onUpdate: 'CASCADE',
             },
           });
         },
         down: async (queryInterface, Sequelize) => {
           await queryInterface.dropTable('todos');
         },
       };