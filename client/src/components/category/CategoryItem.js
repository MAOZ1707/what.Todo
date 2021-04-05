import { motion } from 'framer-motion';
import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

import './categoryItem.css';

const CategoryItem = ({ category, color, selectedColor, isSelected }) => {
	const {
		searchState: { searchTerm },
		dispatch,
	} = useContext(SearchContext);

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
			<div className="category-tasks">8</div>
			<div className="category-name">{category}</div>
			<div className="category-color" style={{ background: `${color}` }} />
		</motion.div>
	);
};

export default CategoryItem;
