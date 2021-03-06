import React, { useContext } from 'react';

import { useFetch } from '../../../hooks/useFetch';
import { AuthContext } from '../../../context/AuthContext';
import { TodoContext } from '../../../context/TodoContext';
import Button from '../../../UIelements/button/Button';
import LoadingIndicator from '../../../UIelements/loaders/LoadingIndicator';

import './deleteTodo.css';
import ErrorMsg from '../../../UIelements/errorMsg/ErrorMsg';

const DeleteTodo = ({ todoId, closeModal }) => {
	const { error, isLoading, sendRequest } = useFetch();
	const { dispatch } = useContext(TodoContext);

	const {
		authState: { token, userId },
	} = useContext(AuthContext);

	const getTodos = async () => {
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
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodo = async () => {
		console.log('deleteTodo');
		try {
			await sendRequest(`/api/todos/${todoId}`, 'DELETE', null, {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			getTodos();
		} catch (error) {}
	};
	return (
		<div className="delete-modal">
			{error && <ErrorMsg error={error} />}
			{isLoading ? (
				<LoadingIndicator />
			) : (
				<React.Fragment>
					<p className="delete-modal-text">
						Do you sure you want to delete this task?
					</p>
					<div className="delete-btn-wrapper">
						<Button onClick={() => closeModal(false)}>Cancel</Button>
						<Button danger onClick={deleteTodo}>
							Confirm
						</Button>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default DeleteTodo;
