import React, { createContext, useReducer } from 'react';
import { todoReducers } from '../reducers/todoReducers';

export const TodoContext = createContext();

const initialState = {
	todos: [],
	todo: {},
	isCompleted: false,
	topPriority: false,
};

const TodoContextProvider = (props) => {
	const [state, dispatch] = useReducer(todoReducers, initialState);
	return <TodoContext.Provider value={{ state, dispatch }}>{props.children}</TodoContext.Provider>;
};

export default TodoContextProvider;
