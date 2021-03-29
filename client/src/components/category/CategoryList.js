import React from 'react';
import CategoryItem from './CategoryItem';

import './categoryList.css';

const CategoryList = () => {
	const categories = ['work', 'shopping', 'payments', 'personal'];
	const colors = ['#FC7FFF', '#DF4646', '#42D1A6', '#46D7EB'];

	return (
		<div className="category-list">
			{categories.map((category, i) => (
				<CategoryItem key={category} category={category} color={colors[i]} />
			))}
		</div>
	);
};

export default CategoryList;
