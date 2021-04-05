const express = require('express');

const { body } = require('express-validator');

const checkAuth = require('../middleware/checkAuth');

const todoController = require('../controller/todoController');

const router = express.Router();

router.use(checkAuth);

router.route('/user/:id').get(todoController.getAllTodosByUserId).delete(todoController.deleteAllTodosByUserId);

router
	.route('/')
	.post(body('category').notEmpty().isString(), body('title').notEmpty().isString(), body('body').notEmpty().isString(), todoController.createTodo);

router
	.route('/:id')
	.get(todoController.getTodoById)
	.patch(body('title').notEmpty().isString(), body('body').notEmpty().isString(), todoController.updateTodoById)
	.delete(todoController.deleteTodoByID);

router.route('/:id/completed').patch(todoController.completeTodo);

module.exports = router;
