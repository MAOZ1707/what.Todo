import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';

import { useFetch } from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../UIelements/button/Button';
import ButtonLoader from '../../UIelements/loaders/ButtonLoader';

const Login = () => {
	const { dispatch } = useContext(AuthContext);

	const { error, isLoading, sendRequest } = useFetch();

	const init = {
		email: '',
		password: '',
	};
	return (
		<AnimatePresence>
			<motion.div
				initial={{ x: -300 }}
				animate={{ x: 0 }}
				exit={{ x: -300 }}
				transition={{ type: 'spring', mass: 0.8, stiffness: 100 }}
				className="user-auth-container"
			>
				{error && <div>we have an error</div>}
				<Formik
					initialValues={init}
					validationSchema={Yup.object({
						email: Yup.string()
							.email('Invalid email address')
							.required('Required'),
						password: Yup.string()
							.min(6, 'Must be 6 characters or more')
							.required('Required'),
					})}
					onSubmit={async (values, { setSubmitting }) => {
						console.log(values);
						try {
							const response = await sendRequest(
								' http://localhost:5000/api/users/login ',
								'POST',
								{
									email: values.email,
									password: values.password,
								},
								{
									'Content-Type': 'application/json',
								}
							);
							dispatch({ type: 'AUTH_SUCCESS', payload: response.data });
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
								{isLoading ? <ButtonLoader /> : 'Log in'}
							</Button>
						</Form>
					)}
				</Formik>
			</motion.div>
		</AnimatePresence>
	);
};

export default Login;
