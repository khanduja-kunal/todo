const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    addUser,
    updateUserById,
    deleteUserById,
} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;