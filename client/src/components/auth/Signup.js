import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { useFetch } from '../../hooks/useFetch';
import Button from '../../UIelements/button/Button';
import ButtonLoader from '../../UIelements/loaders/ButtonLoader';

import './style/auth.css';

const Signup = () => {
	const { dispatch } = useContext(AuthContext);

	const { error, isLoading, sendRequest } = useFetch();

	const init = {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
	};

	return (
		<div className="user-auth-container">
			{error && <div>we have an error</div>}

			<Formik
				initialValues={init}
				validationSchema={Yup.object({
					firstname: Yup.string()
						.max(10, 'Must be 10 characters or less')
						.required('Required'),
					lastname: Yup.string()
						.max(10, 'Must be 10 characters or less')
						.required('Required'),
					email: Yup.string()
						.email('Invalid email address')
						.required('Required'),
					password: Yup.string()
						.min(6, 'Must be 6 characters or more')
						.required('Required'),
				})}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						const response = await sendRequest(
							' http://localhost:5000/api/users/signup ',
							'POST',
							{
								firstname: values.firstname,
								lastname: values.lastname,
								email: values.email,
								password: values.password,
							},
							{
								'Content-Type': 'application/json',
							}
						);
						dispatch({ type: 'AUTH_SUCCESS', payload: response });
					} catch (err) {
						console.log(err);
					}
					setSubmitting(false);
				}}
				validateOnChange={true}
			>
				{(formik) => (
					<Form onSubmit={formik.handleSubmit}>
						<label htmlFor="firstname" className="form-label">
							First name
							<span className="err-msg">
								<ErrorMessage name="firstname" />
							</span>
						</label>
						<div className="form-controller">
							<Field
								type="firstname"
								id="firstname"
								name="firstname"
								className="form-input"
								autoComplete="off"
								required
							/>
						</div>

						<label htmlFor="lastname" className="form-label">
							Last name
							<span className="err-msg">
								<ErrorMessage name="lastname" />
							</span>
						</label>
						<div className="form-controller">
							<Field
								type="lastname"
								id="lastname"
								name="lastname"
								className="form-input"
								autoComplete="off"
								required
							/>
						</div>

						<label htmlFor="email" className="form-label">
							Email
							<span className="err-msg">
								<ErrorMessage name="email" />
							</span>
						</label>
						<div className="form-controller">
							<Field
								type="email"
								id="email"
								name="email"
								className="form-input"
								autoComplete="off"
								required
							/>
						</div>

						<label htmlFor="password" className="form-label">
							Password
							<span className="err-msg">
								<ErrorMessage name="password" />
							</span>
						</label>
						<div className="form-controller">
							<Field
								type="password"
								id="password"
								name="password"
								className="form-input"
								autoComplete="off"
								required
							/>
						</div>

						<Button submit type="submit">
							{isLoading ? <ButtonLoader /> : 'Sign up'}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Signup;
