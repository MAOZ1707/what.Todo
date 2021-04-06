import React, { useEffect, useState } from 'react';
import moment from 'moment';

import './realTimeClock.css';

const RealTimeClock = () => {
	let time = moment(new Date()).format('HH:mm:ss');
	let date = moment(new Date()).utc().format('DD-MM-YYYY');

	const [currentTime, setCurrentTime] = useState(time);
	const [currentDate, setCurrentDate] = useState(date);

	useEffect(() => {
		setCurrentDate(moment(new Date()).utc().format('DD-MM-YYYY'));
	}, [date]);

	const updateTime = () => {
		time = moment(new Date()).format('HH:mm:ss');
		setCurrentTime(time);
	};

	setInterval(updateTime, 1000);

	return (
		<div className="clock-wrapper">
			<div className="clock-date">{currentDate}</div>
			<div className="clock-time">{currentTime}</div>
		</div>
	);
};

export default RealTimeClock;
