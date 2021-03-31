import React from 'react';

import './Button.css';

const Button = (props) => {
	return (
		<button
			className={`base-btn
      ${props.danger && 'btn-danger'} 
      ${props.back && 'btn-back'} 
      ${props.edit && 'btn-edit'}
      ${props.link && 'btn-link'} 
      ${props.cancel && 'btn-cancel'} 
      ${props.create && 'btn-create'} 
      ${props.submit && 'btn-submit'} `}
			onClick={props.onClick}
			type={props.type}
		>
			{props.children}
		</button>
	);
};

export default Button;
