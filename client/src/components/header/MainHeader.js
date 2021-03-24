import React from 'react';
import Clock from './clock/Clock';
import './mainHeader.css';

const MainHeader = () => {
	return (
		<div className="main-nav">
			<Clock />
			<span className="app-name">What to-do</span>
		</div>
	);
};

export default MainHeader;
