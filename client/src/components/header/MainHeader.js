import React from 'react';
import { motion } from 'framer-motion';

import './mainHeader.css';

const MainHeader = () => {
	return (
		<div className="main-nav">
			<motion.div className="app-title">
				<h4>What TO.DO</h4>
			</motion.div>
		</div>
	);
};

export default MainHeader;
