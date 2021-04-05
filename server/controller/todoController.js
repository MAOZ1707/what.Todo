const { validationResult } = require('express-validator');
const moment = require('moment'); // require
const Todos = require('../model/todoSchema');
const User = require('../model/userSchema');
const AppError = require('../utils/appError');

exports.getAllTodosByUserId = async (req, res, next) => {
	const userId = req.params.id;
	let existingUser;
	try {
		existingUser = await User.findById(userId);
	} catch (error) {
		return next(new AppError('Fetching user failed, please try again later.', 404));
	}
	if (!existingUser) {
		return next(new AppError('Could not find user for provided id', 404));
	}

	let userTodos;
	try {
		userTodos = await Todos.find({ creator: existingUser._id });
	} catch (error) {
		return next(new AppError('Could not get data, please try again later', 500));
	}
	if (!userTodos || userTodos.length === 0) {
		return next(new AppError('Could not find todo for this user', 404));
	}

	res.status(200).json({
		todos: userTodos,
	});
};

exports.createTodo = async (req, res, next) => {
	console.log(req.body);
	const { category, title, body, createAt, creator } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new AppError('Invalid inputs passed, please check your data.', 400));
	}

	let user;
	try {
		user = await User.findById(req.body.creator);
	} catch (error) {
		return next(new AppError('Fetching album failed, please try again later', 500));
	}

	if (!user) {
		return next(new AppError('Could not find user for provided id', 404));
	}

	console.log(user);

	if (req.user._id.toString() !== user._id.toString()) {
		return next(new AppError('You dont have permission to create this album', 401));
	}

	try {
		const newTodo = await Todos.create({
			category,
			title,
			body,
			createAt,
			creator,
		});
		console.log(newTodo);
		res.status(200).json({
			todo: newTodo,
		});
	} catch (error) {
		return next(new AppError('Could not create todo, please check your credentials', 404));
	}
};

exports.getTodoById = async (req, res, next) => {
	const todoId = req.params.id;
	try {
		const todo = await Todos.findById(todoId);

		if (!todo) {
			return next(new AppError('Could not find todo, do you want to create?', 404));
		}

		res.status(200).json({
			todo,
		});
	} catch (error) {
		const err = new AppError('Fetching this Todo failed, please try again later.', 404);
		return next(err);
	}
};

exports.updateTodoById = async (req, res, next) => {
	const todoId = req.params.id;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new AppError('Invalid inputs passed, please check your data.', 400));
	}

	let todo;
	try {
		todo = await Todos.findById(todoId);
	} catch (error) {
		return next(new AppError('Something went wrong, could not find todo ', 500));
	}

	if (!todo) {
		return next(new AppError('Could not find todo for provided id', 404));
	}

	if (req.user._id.toString() !== todo.creator.toString()) {
		return next(new AppError('You dont have permission to update this todo', 401));
	}

	try {
		const updates = {
			title: req.body.title,
			body: req.body.body,
		};

		const updatedTodo = await Todos.findByIdAndUpdate(todoId, updates, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			todo: updatedTodo,
		});
	} catch (error) {
		return new AppError('Something went wrong, could not update todo', 401);
	}
};

exports.deleteTodoByID = async (req, res, next) => {
	const todoId = req.params.id;
	console.log(todoId);

	let todo;
	try {
		todo = await Todos.findById(todoId);
	} catch (error) {
		return next(new AppError('Something went wrong, please try again later', 500));
	}

	if (!todo) {
		return next(new AppError('Could not find todo for provided id', 404));
	}
	if (req.user._id.toString() !== todo.creator.toString()) {
		return next(new AppError('You dont have permission to update this album', 401));
	}

	try {
		await Todos.findByIdAndDelete(todoId);
	} catch (error) {
		return new AppError('Something went wrong, could not update album', 401);
	}

	res.status(200).json({ message: 'Delete success' });
};

exports.deleteAllTodosByUserId = async (req, res, next) => {
	const userId = req.params.id;

	let userTodos;
	try {
		userTodos = await Todos.find({ creator: userId });
	} catch (error) {
		return new AppError('Something went wrong, please try again later', 500);
	}

	if (!userTodos) return new AppError('Could not find todos! ', 404);

	try {
		await Todos.deleteMany({ creator: userId });
		res.status(200).json({ todos: null });
	} catch (error) {
		return new AppError('Something went wrong, please try again later', 500);
	}
};

exports.completeTodo = async (req, res, next) => {
	const todoId = req.params.id;

	console.log(req.body.isComplete);

	let todo;
	try {
		todo = await Todos.findById(todoId);
	} catch (error) {
		return next(new AppError('Something went wrong, could not find todo ', 500));
	}

	if (!todo) {
		return next(new AppError('Could not find todo for provided id', 404));
	}

	if (req.user._id.toString() !== todo.creator.toString()) {
		return next(new AppError('You dont have permission to update this todo', 401));
	}

	try {
		const updates = {
			isComplete: req.body.isComplete,
		};

		const updatedTodo = await Todos.findByIdAndUpdate(todoId, updates, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			todo: updatedTodo,
		});
	} catch (error) {
		return new AppError('Something went wrong, could not update todo', 401);
	}
};
