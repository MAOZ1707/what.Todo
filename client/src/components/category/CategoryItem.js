import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { TodoContext } from '../../context/TodoContext';
import { useFetch } from '../../hooks/useFetch';

import './categoryItem.css';

const CategoryItem = ({ category, color, selectedColor, isSelected }) => {
	const {
		state: { todos },
	} = useContext(TodoContext);

	const {
		searchState: { searchTerm },
		dispatch,
	} = useContext(SearchContext);

	const [numberTodos, setNumberTodos] = useState();

	useEffect(() => {
		let number = 0;
		number = todos.forEach((todo) => {
			if (todo.category === category) {
				number += 1;
			}
			setNumberTodos(number);
		});
	}, [category, todos]);

	const handleSearchTerm = () => {
		selectedColor(color);
		if (searchTerm === category) {
			dispatch({ type: 'CLEAR_SEARCH' });
			selectedColor(false);
		}
		if (searchTerm === '' || searchTerm !== category) {
			dispatch({ type: 'SEARCH_TERM', payload: category });
		}
	};

	return (
		<motion.div className="category" onClick={handleSearchTerm}>
			{isSelected && (
				<motion.div
					layoutId="outline"
					className="outline"
					initial={false}
					animate={{ scale: 1.2, transition: { ease: 'linear', duration: 0.4 }, border: `4px solid ${color}` }}
					exit={{ scale: 0, transition: { ease: 'linear', duration: 0.4 } }}
				/>
			)}
			<div className="category-tasks">{numberTodos}</div>
			<div className="category-name">{category}</div>
			<div className="category-color" style={{ background: `${color}` }} />
		</motion.div>
	);
};

export default CategoryItem;
