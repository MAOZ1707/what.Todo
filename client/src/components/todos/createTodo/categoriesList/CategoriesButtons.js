import React, { useState } from 'react';

import './CategoriesButton.css';

const CategoriesButtons = ({ select }) => {
	const [categoriesList, setCategoriesList] = useState({
		activeCategory: {},
		categories: [
			{ id: 1, name: 'work', color: '#fc7fff' },
			{ id: 2, name: 'personal', color: '#42d1a6' },
			{ id: 3, name: 'shopping', color: '#df4646' },
			{ id: 4, name: 'payments', color: '#46d7eb' },
		],
	});

	const toggleActive = (index) => {
		setCategoriesList({
			...categoriesList,
			activeCategory: categoriesList.categories[index],
		});
		select(categoriesList.categories[index].name);
	};

	const toggleActiveStyle = (index) => {
		if (categoriesList.categories[index] === categoriesList.activeCategory) {
			return 'active';
		} else {
			return 'inactive';
		}
	};

	return (
		<>
			{categoriesList.categories.map((category, index) => (
				<button
					key={index}
					className={`category-${category.name} ${toggleActiveStyle(index)}`}
					style={
						toggleActiveStyle(index) === 'inactive'
							? { background: '#bdbcbc' }
							: { background: category.color }
					}
					type="button"
					onClick={() => toggleActive(index)}
				>
					{category.name}
				</button>
			))}
		</>
	);
};

export default CategoriesButtons;
