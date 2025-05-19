const express = require('express');
const app = express();
require('dotenv').config();
const todoRoutes = require('./routes/todoRoutes');

app.use(express.json());

app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
