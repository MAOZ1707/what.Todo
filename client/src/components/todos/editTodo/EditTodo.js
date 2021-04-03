import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useFetch } from '../../../hooks/useFetch';
import { AuthContext } from '../../../context/AuthContext';
import { TodoContext } from '../../../context/TodoContext';

import Button from '../../../UIelements/button/Button';
import ButtonLoader from '../../../UIelements/loaders/ButtonLoader';

import './editTodo.css';

const EditTodo = ({ title, body, todoId, closeEditModal }) => {
	const { error, isLoading, sendRequest } = useFetch();
	const { dispatch } = useContext(TodoContext);

	const {
		authState: { token, userId },
	} = useContext(AuthContext);

	const init = {
		title,
		body,
	};

	const getNewTodo = async () => {
		try {
			const getDate = await sendRequest(`/api/todos/user/${userId}`, 'GET', null, {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			dispatch({ type: 'GET_ALL_TODOS', payload: getDate.data });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="edit-task-container">
			{error && <div>we have an error</div>}
			{isLoading && <div>ADD LOADING INDICATOR</div>}
			<Formik
				initialValues={init}
				validationSchema={Yup.object({
					title: Yup.string().required('Required').min(3, 'Must be 3 characters or more'),
					body: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
				})}
				onSubmit={async (values, { setSubmitting }) => {
					console.log(values);

					try {
						const response = await sendRequest(
							`/api/todos/${todoId}`,
							'PATCH',
							{
								body: values.body,
								title: values.title,
							},
							{
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + token,
							}
						);

						dispatch({ type: 'UPDATE_TODO', payload: response.data.todo });
						getNewTodo();
						if (response.statusText === 'OK') {
							setTimeout(() => {
								closeEditModal(false);
							}, 500);
						}
					} catch (error) {
						console.log(error);
					}
					setSubmitting(false);
				}}
				validateOnChange={true}
			>
				{(formik) => (
					<Form onSubmit={formik.handleSubmit}>
						<label htmlFor="body" className="form-label-title">
							Title
						</label>
						<span className="err-msg">
							<ErrorMessage name="title" />
						</span>
						<div className="form-controller">
							<Field id="title" name="title" className="create-task-input" autoComplete="off" required placeholder="Add Task" />
						</div>

						<label htmlFor="body" className="form-label-description">
							Description
						</label>
						<span className="err-msg">
							<ErrorMessage name="body" />
						</span>
						<div className="form-controller">
							<Field as="textarea" id="body" name="body" className="create-task-textarea" autoComplete="off" required />
						</div>

						<Button create type="submit">
							{isLoading ? <ButtonLoader /> : 'Edit task'}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default EditTodo;