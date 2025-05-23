const express = require('express');
const router = express.Router();
const {
    getTodos,
    getTodo,
    addTodo,
    updateTodoById,
    deleteTodoById,
} = require('../controllers/todoController');

router.get('/', getTodos);
router.get('/:id', getTodo);
router.post('/', addTodo);
router.put('/:id', updateTodoById);
router.delete('/:id', deleteTodoById);

module.exports = router;