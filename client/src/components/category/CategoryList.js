import React, { useState } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';

import CategoryItem from './CategoryItem';

import './categoryList.css';

const CategoryList = () => {
	const [selected, setSelected] = useState();
	const categories = ['work', 'shopping', 'payments', 'personal'];
	const colors = ['#FC7FFF', '#DF4646', '#42D1A6', '#46D7EB'];

	return (
		<AnimateSharedLayout>
			<div className="category-list">
				{categories.map((category, i) => (
					<CategoryItem key={category} category={category} color={colors[i]} isSelected={selected === colors[i]} selectedColor={setSelected} />
				))}
			</div>
		</AnimateSharedLayout>
	);
};

export default CategoryList;
