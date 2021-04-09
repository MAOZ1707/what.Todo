import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import { ReactComponent as PlusIcon } from '../../assets/icons/plus-solid.svg';
import CategoryList from '../category/CategoryList';
import TodoList from '../todos/TodoList';
import RealTimeClock from '../header/clock/RealTimeClock';
import { useFetch } from '../../hooks/useFetch';

import './dashboard.css';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
	const history = useHistory();
	const [fullName, setFullName] = useState(null);
	const { sendRequest } = useFetch();

	const {
		authState: { userId, token },
	} = useContext(AuthContext);

	const getFullName = async () => {
		try {
			const getData = await sendRequest(
				`/api/users/${userId}/full-name`,
				'GET',
				null,
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				}
			);
			const { user } = getData.data;
			console.log(user);
			setFullName(user);
		} catch (error) {}
	};

	console.log(fullName);

	useEffect(() => {
		getFullName();
	}, []);

	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<div className="header-info">
					<h3>
						hey
						<span className="user-name">
							{fullName &&
								` ${fullName?.firstname.toUpperCase()} ${fullName?.lastname.toUpperCase()}`}
						</span>
					</h3>
					<RealTimeClock />
				</div>
				<motion.button
					whileHover={{
						scale: [1, 0.8, 1, 0.8, 1],
						transition: { duration: 0.4 },
					}}
					transition={{ ease: 'anticipate', duration: 0.4 }}
					className="create-btn-link"
					onClick={() => history.push('/create-task')}
				>
					<PlusIcon />
				</motion.button>
			</div>
			<CategoryList />
			<TodoList />
		</div>
	);
};

export default Dashboard;
