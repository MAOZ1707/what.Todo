import React, { useState } from 'react';

import Signup from './Signup';
import Login from './Login';

import './style/auth.css';

const AuthContainer = () => {
	const [authMode, setAuthMode] = useState('signup');

	return (
		<div className="auth-container">
			<div className="auth-tabs">
				<button
					className={authMode === 'signup' ? 'active' : 'not-active'}
					onClick={() => setAuthMode('signup')}
				>
					SIGN UP
				</button>
				<button
					className={authMode === 'login' ? 'active' : 'not-active'}
					onClick={() => setAuthMode('login')}
				>
					LOG IN
				</button>
			</div>
			{authMode === 'signup' ? <Signup /> : <Login />}
		</div>
	);
};

export default AuthContainer;
