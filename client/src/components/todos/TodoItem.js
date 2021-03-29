import React, { useContext, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { TodoContext } from '../../context/TodoContext';

import './style/todoItem.css';

const TodoItem = ({ info }) => {
	const [xAxis, setXaxis] = useState('');
	const { state, dispatch } = useContext(TodoContext);

	let color;
	switch (info.category) {
		case 'work':
			color = '#FC7FFF';
			break;
		case 'shopping':
			color = '#DF4646';
			break;
		case 'payments':
			color = '#42D1A6';
			break;
		case 'personal':
			color = '#46D7EB';
			break;
		default:
			break;
	}

	let x = useMotionValue(0);
	const input = [-100, 0, 100];

	const background = useTransform(x, input, [
		' #ff008c ',
		'#fff ',
		'rgb(3, 209, 0)',
	]);

	useEffect(() => {
		x.onChange((current) => {
			if (Math.floor(current) < 0 && Math.floor(current) <= -100)
				setXaxis('delete');
			if (Math.floor(current) > 0 && Math.floor(current) >= 100)
				setXaxis('edit');
		});
	}, [x, xAxis]);

	const getAxisState = () => {
		console.log('DRAG--END', xAxis);
	};

	return (
		<motion.div
			className="todo-item"
			drag="x"
			style={{ x, background }}
			dragConstraints={{ left: 0, right: 0 }}
			onDragEnd={getAxisState}
		>
			<div className="todo-item-date">{info.created}</div>
			<p className="todo-item-title">{info.title}</p>
			<div
				className="todo-item-category"
				style={{
					background: color,
					width: '10px',
					height: '10px',
					border: 'none',
					borderRadius: '50%',
				}}
			></div>
			{/* <p className="todo-item-description">{info.description}</p> */}
		</motion.div>
	);
};

export default TodoItem;
