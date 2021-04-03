import React from 'react';
import { motion } from 'framer-motion';

import './mainHeader.css';

const MainHeader = () => {
	return (
		<div className="main-nav">
			<motion.div
				animate={{ transition: { ease: 'backInOut' } }}
				whileHover={{
					scale: [0.8, 1],
					transition: { duration: 0.3, ease: 'anticipate' },
				}}
				className="app-title"
			>
				<h4>What TO.DO</h4>
			</motion.div>
		</div>
	);
};

export default MainHeader;
