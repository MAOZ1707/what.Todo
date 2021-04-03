import React, { useContext, useEffect } from 'react';
import TodoItem from './TodoItem';

import { motion, AnimateSharedLayout } from 'framer-motion';

import { TodoContext } from '../../context/TodoContext';
import { useFetch } from '../../hooks/useFetch';

import './style/todoList.css';
import { AuthContext } from '../../context/AuthContext';

const TodoList = () => {
	const { state, dispatch } = useContext(TodoContext);
	const {
		authState: { token, userId },
	} = useContext(AuthContext);

	const { error, isLoading, sendRequest } = useFetch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const getDate = await sendRequest(`/api/todos/user/${userId}`, 'GET', null, {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				});
				dispatch({ type: 'GET_ALL_TODOS', payload: getDate.data });
			} catch (error) {}
		};
		fetchData();
	}, [sendRequest, token, userId]);

	console.log(state);

	return (
		<AnimateSharedLayout>
			<motion.ul layout initial={{ borderRadius: 25 }} className="todo-list">
				{error && <div style={{ background: 'red' }}>{error}</div>}
				{isLoading && <div>LOADING....</div>}

				{state.todos && !error && state.todos.map((todo) => <TodoItem info={todo} key={todo._id} />)}
			</motion.ul>
		</AnimateSharedLayout>
	);
};

export default TodoList;
