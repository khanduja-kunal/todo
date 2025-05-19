const pool = require('../db');

const getAllTodos = async () => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
  return result.rows;
};

const getTodoById = async (id) => {
  const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  return result.rows[0];
};

const createTodo = async (title) => {
  const result = await pool.query(
    'INSERT INTO todos (title) VALUES ($1) RETURNING *',
    [title]
  );
  return result.rows[0];
};

const updateTodo = async (id, title, completed) => {
  const result = await pool.query(
    'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
    [title, completed, id]
  );
  return result.rows[0];
};

const deleteTodo = async (id) => {
  const result = await pool.query(
    'DELETE FROM todos WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
