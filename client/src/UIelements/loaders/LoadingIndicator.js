import React from 'react';
import { motion } from 'framer-motion';

import './LoadingIndicator.css';

const LoadingIndicator = () => {
	const cube = {
		visible: {
			x: [40, 40, 40, 40, 40, 40, -10],
			y: [0, 0, 0, 0, 0, 0, 0, -147],
			rotate: [0, 0, 0, 0, 0, 135],
			scale: 1,

			backgroundColor: [
				'#fa4a4a',
				'#44a4fd',
				'#aaaaaa',
				'#f05dfd',
				'#38fd9a',
				'#aaaaaa',
				'#fa4a4a',
				'#44a4fd',
				'#aaaaaa',
				'#f05dfd',
				'#fa4a4a',
				'#aaaaaa',
				'#44a4fd',
				'#38fd9a',
			],
			transition: {
				duration: 2.5,
				delay: 0.8,
				rotate: {
					delay: 1.4,
					duration: 1.8,
				},
				scale: {
					delay: 1.2,
					duration: 0.5,
				},
				y: {
					delay: 0.6,
					duration: 2.5,
				},
				x: {
					delay: 0.6,
					duration: 2.5,
				},
				backgroundColor: {
					delay: 4.8,
					duration: 3,
					repeat: Infinity,
					// repeatType: 'reverse',
					repeatDelay: 1,
					ease: 'linear',
				},
			},
		},
		hidden: {
			x: -160,
			scale: 0,
		},
	};
	const triangle = {
		visible: {
			x: [0, 0, 0, 50],
			y: [0, -50, 0, -55],
			rotate: [0, 360, 0, 180],
			opacity: 1,
			borderBottom: [
				`45px solid #38fd9a`,
				`45px solid #fa4a4a`,
				`45px solid #aaaaaa`,
				`45px solid #44a4fd`,
				`45px solid #f05dfd`,
				`45px solid #aaaaaa`,
				`45px solid #38fd9a`,
				`45px solid #44a4fd`,
				`45px solid #aaaaaa`,
				`45px solid #f05dfd`,
				`45px solid #44a4fd`,
				`45px solid #aaaaaa`,
			],
			transition: {
				duration: 2,
				delay: 1,
				borderBottom: {
					delay: 4.8,
					duration: 3,
					repeat: Infinity,
					repeatType: 'loop',
					repeatDelay: 1,
					ease: 'circInOut',
				},
			},
		},
		hidden: {
			x: 20,
			opacity: 0,
			transition: {
				duration: 1,
				delay: 1,
			},
		},
	};
	const circle = {
		visible: {
			x: [0, -20, -20, -70],
			y: [0, -80, -35, -140, -100],
			scale: [1, 0.6, 0.8, 1],
			backgroundColor: [
				'#f05dfd',
				'#38fd9a',
				'#aaaaaa',
				'#fa4a4a',
				'#44a4fd',
				'#f05dfd',
				'#aaaaaa',
				'#fa4a4a',
				'#44a4fd',
				'#f05dfd',
				'#38fd9a',
				'#aaaaaa',
				'#fa4a4a',
				'#44a4fd',
			],
			transition: {
				duration: 2,
				mass: 2,
				delay: 1,
				backgroundColor: {
					delay: 4.8,
					duration: 3,
					repeat: Infinity,
					// repeatType: 'reverse',
					repeatDelay: 1,
					ease: 'easeInOut',
				},
			},
		},
		hidden: {
			x: 0,
			y: 0,
			scale: 1,
		},
	};
	const pipe = {
		visible: {
			x: [0, -125],
			y: [0, 10, 0],
			scaleY: [1, 0.3, 1],
			backgroundColor: [
				'#44a4fd',
				'#fa4a4a',
				'#f05dfd',
				'#aaaaaa',
				'#38fd9a',
				'#fa4a4a',
				'#aaaaaa',
				'#44a4fd',
				'#f05dfd',
				'#38fd9a',
				'#aaaaaa',
				'#fa4a4a',
				'#44a4fd',
				'#aaaaaa',
				'#f05dfd',
			],
			transition: {
				duration: 2,
				delay: 1.2,
				backgroundColor: {
					delay: 4.3,
					duration: 4,
					repeat: Infinity,
					// repeatType: 'reverse',
					repeatDelay: 1,
					ease: 'easeInOut',
				},
			},
		},
		hidden: { x: 100 },
	};

	return (
		<motion.div className="loading-indicator-wrapper">
			<motion.div
				className="loading-shape-triangle"
				variants={triangle}
				initial="hidden"
				animate="visible"
			></motion.div>
			<motion.div
				className="loading-shape-cube"
				variants={cube}
				initial="hidden"
				animate="visible"
			></motion.div>
			<motion.div
				className="loading-shape-circle"
				variants={circle}
				initial="hidden"
				animate="visible"
			></motion.div>
			<motion.div
				className="loading-shape-pipe"
				variants={pipe}
				initial="hidden"
				animate="visible"
			></motion.div>
		</motion.div>
	);
};

export default LoadingIndicator;
