import React, { useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
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

	console.log(state);

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
				dispatch({ type: 'GET_ALL_TODOS', payload: getDate });
			} catch (error) {}
		};
		fetchData();
	}, [sendRequest, token, userId]);

	return (
		<div className="todo-list">
			{error && <div style={{ background: 'red' }}>{error}</div>}
			{isLoading && <div>LOADING....</div>}
			{state.todos &&
				!error &&
				state.todos.map((todo) => <TodoItem info={todo} key={todo._id} />)}
		</div>
	);
};

export default TodoList;
