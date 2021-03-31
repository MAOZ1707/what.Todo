import React, { useContext, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { TodoContext } from '../../context/TodoContext';

import './style/todoItem.css';

const TodoItem = ({ info }) => {
	const [xAxis, setXaxis] = useState('');
	const { state, dispatch } = useContext(TodoContext);
	const [dragMode, setDragMode] = useState(false);

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
	const background = useTransform(x, input, ['#ff3838 ', '#fff ', '#FFB75E']);

	useEffect(() => {
		x.onChange((current) => {
			if (Math.floor(current) < 0 && Math.floor(current) <= -100)
				setXaxis('delete');
			if (Math.floor(current) > 0 && Math.floor(current) >= 100)
				setXaxis('edit');
		});
	}, [x, xAxis]);

	const getAxisState = () => {
		setDragMode(false);
		console.log('DRAG--END', xAxis);
	};
	console.log(dragMode);
	return (
		<motion.div
			className="todo-item"
			drag="x"
			style={{ x, background }}
			dragConstraints={{ left: 0, right: 0 }}
			onDragEnd={getAxisState}
			onDragStart={() => setDragMode(true)}
		>
			{dragMode && (
				<motion.div className="drag-options">
					<motion.span
						animate={{ y: 10, opacity: [0, 1] }}
						transition={{ duration: 0.3 }}
						className="drag-to-delete"
					>
						Delete
					</motion.span>
					<motion.span
						animate={{ y: 10, opacity: [0, 1] }}
						transition={{ duration: 0.3 }}
						className="drag-to-edit"
					>
						Edit
					</motion.span>
				</motion.div>
			)}
			<div className="todo-item-date">{info.createAt}</div>
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
