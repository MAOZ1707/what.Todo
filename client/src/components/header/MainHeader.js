import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';

import { AuthContext } from '../../context/AuthContext';

import './mainHeader.css';

const MainHeader = () => {
	const { logout, dispatch } = useContext(AuthContext);
	const history = useHistory();
	// const [userLogOut, setUserLogOut] = useState(false);

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
		localStorage.removeItem('userData');
	};

	// if (userLogOut) {
	// 	setTimeout(() => {
	// 		// history.push('/auth');
	// 		console.log('500 sec');
	// 	}, 500);
	// }

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
