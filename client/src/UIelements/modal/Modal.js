import React from 'react';
import ReactDOM from 'react-dom';
import BackDrop from '../backDrop/BackDrop';

import './modal.css';

const ModalLayout = (props) => {
	const content = (
		<div className={`modal ${props.className}`} style={props.style}>
			<div className={`modal__content ${props.contentClass}`}>
				{props.children}
			</div>
			<footer className={`modal__footer ${props.footerClass}`}>
				{props.footer}
			</footer>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById('modal'));
};

const Modal = (props) => {
	return (
		<React.Fragment>
			{props.show && <BackDrop onClick={props.onCancel} />}
			{props.show && (
				<div>
					<ModalLayout {...props} />
				</div>
			)}
		</React.Fragment>
	);
};

export default Modal;
