const express = require('express');
const router = express.Router();

const {
    getAllTodos,
    createTodo,
    getTodo,
    getTodoById,
    updateTodo,
    deleteTodo
} = require('../controller/todo');
router.get("/todos/", getAllTodos);

router.post("/todo/create", createTodo);

router.param("todoId", getTodoById);

router.get("/todos/:todoId", getTodo);

router.post("/todo/:todoId/update", updateTodo);

router.delete("/todo/:todoId/delete", deleteTodo);

module.exports = router;