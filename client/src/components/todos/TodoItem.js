import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { TodoContext } from '../../context/TodoContext';
import { AuthContext } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import Modal from '../../UIelements/modal/Modal';

import './style/todoItem.css';
import EditTodo from './editTodo/EditTodo';
import DeleteTodo from './deleteTodo/DeleteTodo';

const TodoItem = ({ info }) => {
	const [xAxis, setXaxis] = useState('');
	const { dispatch } = useContext(TodoContext);
	const {
		authState: { token },
	} = useContext(AuthContext);
	const [dragMode, setDragMode] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isComplete, setIsComplete] = useState(info.isComplete);
	const [openModal, setOpenModal] = useState(false);
	const [dragOption, setDragOption] = useState(false);

	const { error, isLoading, sendRequest } = useFetch();

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
			if (Math.floor(current) < 0 && Math.floor(current) <= -100) setXaxis('delete');
			if (Math.floor(current) > 0 && Math.floor(current) >= 100) setXaxis('edit');
			if (Math.floor(current) < 100 && Math.floor(current) >= 0) setXaxis('');
			if (Math.floor(current) > -100 && Math.floor(current) <= 0) setXaxis('');
		});
	}, [x, xAxis]);

	const getAxisState = () => {
		setDragMode(false);
		if (xAxis === 'delete') {
			setDragOption(xAxis);
			setOpenModal(true);
			setXaxis('');
		}
		if (xAxis === 'edit') {
			setDragOption(xAxis);
			setOpenModal(true);
			setXaxis('');
		}
		if (xAxis === '') return;
	};

	const taskComplete = async (e) => {
		let target = e.target.checked;
		const response = await sendRequest(
			`/api/todos/${info._id}/completed`,
			'PATCH',
			{ isComplete: target },
			{
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			}
		);
		const { todo } = await response.data;
		dispatch({ type: 'COMPLETE_TASK', payload: todo });
		setIsComplete(todo.isComplete);
	};

	const toggleOpen = () => setIsOpen(!isOpen);
	const closeModal = () => setOpenModal(false);

	return (
		<motion.li
			onDoubleClick={toggleOpen}
			className="todo-item"
			drag="x"
			style={{ x, background }}
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.2}
			dragMomentum={false}
			dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
			onDragEnd={getAxisState}
			onDragStart={() => setDragMode(true)}
		>
			{isLoading && <div>LOADING</div>}

			<Modal show={openModal} onCancel={closeModal}>
				{dragOption === 'edit' && <EditTodo title={info.title} body={info.body} todoId={info._id} closeModal={setOpenModal} />}
				{dragOption === 'delete' && <DeleteTodo todoId={info._id} closeModal={setOpenModal} />}
			</Modal>

			{dragMode && (
				<motion.div className="drag-options">
					<motion.span animate={{ y: 10, opacity: [0, 1] }} transition={{ duration: 0.3 }} className="drag-to-delete">
						Delete
					</motion.span>
					<motion.span animate={{ y: 10, opacity: [0, 1] }} transition={{ duration: 0.3 }} className="drag-to-edit">
						Edit
					</motion.span>
				</motion.div>
			)}
			<div className="todo-item-wrapper">
				<div htmlFor="_checkbox" id="container">
					<input checked={isComplete} type="checkbox" name="check" id="_checkbox" onChange={taskComplete} />
					<label htmlFor="check" className="check-mark">
						<div></div>
					</label>
				</div>

				<div className="todo-item-date">{info.createAt}</div>
				<p className={`todo-item-title ${isComplete && 'todo-complete'}`}>{info.title}</p>
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
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.p
						layout
						transition={{ duration: 0.4, ease: 'easeInOut' }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.6 } }}
						className="todo-item-description"
					>
						{info.body}
					</motion.p>
				)}
			</AnimatePresence>
		</motion.li>
	);
};

export default TodoItem;
