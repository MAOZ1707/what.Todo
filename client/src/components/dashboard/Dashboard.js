import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import { ReactComponent as PlusIcon } from '../../assets/icons/plus-solid.svg';
import CategoryList from '../category/CategoryList';
import TodoList from '../todos/TodoList';

import './dashboard.css';
import RealTimeClock from '../header/clock/RealTimeClock';

const Dashboard = () => {
	const history = useHistory();

	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<div className="header-info">
					<h3>hey User-name</h3>
					<RealTimeClock />
				</div>
				<motion.button
					whileHover={{ scale: [1, 0.8, 1, 0.8, 1], transition: { duration: 0.4 } }}
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
