// const initialState = {
// 	todos: [],
// 	todo: {},
// 	isCompleted: false,
// 	topPriority: false,
// };

export const todoReducers = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				...state,
				todos: [...state.todos, action.payload],
			};
		case 'GET_ALL_TODOS':
			return state.todos;

		case 'SELECTED_TODO':
			return {
				...state,
				todo: action.todo,
			};
		case 'UPDATE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) =>
					todo._id === action.payload._id ? action.payload : todo
				),
			};
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) => todo._id !== action.payload._id),
			};
		default:
			break;
	}
};
