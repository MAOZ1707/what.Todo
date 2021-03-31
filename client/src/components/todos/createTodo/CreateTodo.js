import React, { useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useHistory } from 'react-router';

import { useFetch } from '../../../hooks/useFetch';
import Button from '../../../UIelements/button/Button';
import ButtonLoader from '../../../UIelements/loaders/ButtonLoader';
import { AuthContext } from '../../../context/AuthContext';
import CategoriesButtons from './categoriesList/CategoriesButtons';

import './createTodo.css';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTodo = () => {
	const { error, isLoading, sendRequest } = useFetch();
	const [categoryName, setCategoryName] = useState('');
	const history = useHistory();

	const {
		authState: { token, userId },
	} = useContext(AuthContext);

	const [startDate, setStartDate] = useState(new Date());

	const selectedCategory = (category) => {
		setCategoryName(category);
	};

	const init = {
		title: '',
		body: '',
	};

	return (
		<div className="create-task-container">
			{error && <div>we have an error</div>}
			{isLoading && <div>ADD LOADING INDICATOR</div>}
			<Formik
				initialValues={init}
				validationSchema={Yup.object({
					title: Yup.string()
						.required('Required')
						.min(3, 'Must be 3 characters or more'),
					body: Yup.string()
						.min(6, 'Must be 6 characters or more')
						.required('Required'),
				})}
				onSubmit={async (values, { setSubmitting }) => {
					console.log(values);
					console.log(startDate);
					console.log(categoryName);
					try {
						const response = await sendRequest(
							'http://localhost:5000/api/todos',
							'POST',
							{
								category: categoryName,
								body: values.body,
								title: values.title,
								createAt: moment(startDate).utc().format('DD/MM/YYYY'),
								creator: userId,
							},
							{
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + token,
							}
						);
						if (!isLoading) {
							history.push('/');
						}
						// dispatch({ type: 'AUTH_SUCCESS', payload: response });
						console.log(response);
					} catch (error) {
						console.log(error);
					}
					setSubmitting(false);
				}}
				validateOnChange={true}
			>
				{(formik) => (
					<Form onSubmit={formik.handleSubmit}>
						<span className="err-msg">
							<ErrorMessage name="title" />
						</span>
						<div className="form-controller">
							<Field
								id="title"
								name="title"
								className="create-task-input"
								autoComplete="off"
								required
								placeholder="Add Task"
							/>
						</div>

						<DatePicker
							selected={startDate}
							closeOnScroll={true}
							onChange={(date) => setStartDate(date)}
							dateFormat="dd/MM/yyyy"
							placeholderText="Select a weekday"
							className="create-task-date"
						/>

						<div className="categories-wrapper">
							<CategoriesButtons select={selectedCategory} />
						</div>

						<label htmlFor="body" className="form-label-description">
							Description
						</label>
						<span className="err-msg">
							<ErrorMessage name="body" />
						</span>
						<div className="form-controller">
							<Field
								as="textarea"
								id="body"
								name="body"
								className="create-task-textarea"
								autoComplete="off"
								required
							/>
						</div>

						<Button create type="submit">
							{isLoading ? <ButtonLoader /> : 'Create task'}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CreateTodo;
