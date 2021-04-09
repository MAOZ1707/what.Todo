import React, { useContext } from 'react';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';

import { AuthContext } from '../../context/AuthContext';

import './mainHeader.css';

const MainHeader = () => {
	const { dispatch } = useContext(AuthContext);

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
		localStorage.removeItem('userData');
	};

	return (
		<div className="main-nav">
			<div className="app-title">
				<h4>What TO.DO</h4>
			</div>
			<button className="log-out-btn" onClick={handleLogout}>
				<LogoutIcon />
			</button>
		</div>
	);
};

export default MainHeader;
