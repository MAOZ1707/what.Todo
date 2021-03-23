const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
	category: {
		type: String,
		required: [true, 'selected category is require'],
	},
	title: {
		type: String,
		trim: true,
	},
	body: {
		type: String,
		required: [true, 'Please write your task'],
		trim: true,
	},
	createAt: {
		type: String,
	},
	isComplete: {
		type: Boolean,
		default: false,
	},
	creator: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
