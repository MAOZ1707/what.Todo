import React from 'react';

import './categoryItem.css';

const CategoryItem = ({ category, color }) => {
	console.log(color);
	return (
		<div className="category">
			<div className="category-tasks">8</div>
			<div className="category-name">{category}</div>
			<div className="category-color" style={{ background: `${color}` }} />
		</div>
	);
};

export default CategoryItem;
