// const initialState = {
// 	todos: [],
// 	todo: {},
// isComplete: false,
// 	topPriority: false,
// };

export const todoReducers = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			console.log(action.payload);
			return {
				...state,
				todos: [...state.todos, action.payload],
			};
		case 'GET_ALL_TODOS':
			return action.payload;

		case 'SELECTED_TODO':
			return {
				...state,
				todo: action.todo,
			};
		case 'UPDATE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) => {
					if (todo._id === action.payload._id) return action.payload;
					return todo;
				}),
			};
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) => todo._id !== action.payload._id),
			};
		case 'COMPLETE_TASK':
			console.log(action);
			return {
				...state,
				todos: state.todos.filter((todo) => {
					if (todo._id === action.payload._id) return action.payload;
					return todo;
				}),
			};
		default:
			break;
	}
};
