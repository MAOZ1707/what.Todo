import React from 'react';
import './ButtonLoader.css';

const buttonLoader = () => {
	return (
		<div className="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default buttonLoader;
