import React, { useContext, useEffect } from 'react';
import TodoItem from './TodoItem';

import { motion, AnimateSharedLayout } from 'framer-motion';

import { useFetch } from '../../hooks/useFetch';
import { TodoContext } from '../../context/TodoContext';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';
import LoadingIndicator from '../../UIelements/loaders/LoadingIndicator';

import './style/todoList.css';

const TodoList = () => {
	const { state, dispatch } = useContext(TodoContext);
	const {
		searchState: { searchTerm, inSearch },
	} = useContext(SearchContext);
	const {
		authState: { token, userId },
	} = useContext(AuthContext);

	const { error, isLoading, sendRequest } = useFetch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const getDate = await sendRequest(
					`/api/todos/user/${userId}`,
					'GET',
					null,
					{
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					}
				);
				dispatch({ type: 'GET_ALL_TODOS', payload: getDate.data });
			} catch (error) {}
		};
		fetchData();
	}, [sendRequest, token, userId, searchTerm]);

	let filterTodos;

	switch (inSearch) {
		case false:
			filterTodos = state.todos && state.todos;
			break;
		case true:
			filterTodos =
				state.todos &&
				state.todos.filter((todo) => todo.category.includes(searchTerm));
			break;
		default:
			break;
	}

	return (
		<AnimateSharedLayout>
			<motion.ul layout initial={{ borderRadius: 25 }} className="todo-list">
				{error && <div style={{ background: 'red' }}>{error}</div>}
				{isLoading && <LoadingIndicator />}

				{!isLoading &&
					filterTodos &&
					!error &&
					filterTodos.map((todo) => <TodoItem info={todo} key={todo._id} />)}
			</motion.ul>
		</AnimateSharedLayout>
	);
};

export default TodoList;
