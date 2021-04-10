import React, { useEffect, useState } from 'react';

import './errorMsg.css';

const ErrorMsg = ({ error }) => {
	const [msg, setMsg] = useState(error);

	useEffect(() => {
		setMsg(error);
	}, [error, msg]);

	return (
		<div className="error-msg-container">
			{msg && <div className="error-msg-text">{msg}</div>}
		</div>
	);
};

export default ErrorMsg;
