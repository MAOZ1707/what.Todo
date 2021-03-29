import React, { useState } from 'react';
import Clock from '../header/clock/Clock';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus-solid.svg';
import CategoryList from '../category/CategoryList';

import './dashboard.css';
import TodoList from '../todos/TodoList';

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<div className="header-info">
					<h3>hey User-name</h3>
					<Clock />
				</div>
				<button className="create-btn-link">
					<PlusIcon />
				</button>
			</div>
			<CategoryList />
			<TodoList />
		</div>
	);
};

export default Dashboard;
