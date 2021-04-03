import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import Clock from '../header/clock/Clock';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus-solid.svg';
import CategoryList from '../category/CategoryList';
import TodoList from '../todos/TodoList';

import './dashboard.css';

const Dashboard = () => {
	const history = useHistory();

	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<div className="header-info">
					<h3>hey User-name</h3>
					<Clock />
				</div>
				<motion.button
					whileHover={{ scale: [1, 0.5, 1], rotate: [0, 0, 180] }}
					transition={{ ease: 'anticipate' }}
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
