import React, { useState, useEffect } from 'react';

import ProgressBar from '../components/ProgressBar'
import TimeDisplay from '../components/TimeDisplay'

const HackerCountdown = ({countDownDate, eventDurationHours}) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // calculate ratios
    const diff = new Date(Math.abs(countDownDate - now));
    const rawHours = 24 * diff.getDay() + diff.getHours() + diff.getMinutes() / 60
    const progress = 1 - (rawHours / eventDurationHours)


    return (
        <>
            <TimeDisplay days={diff.getDay()} hours={diff.getHours()} minutes={diff.getMinutes()} seconds={diff.getSeconds()}></TimeDisplay>
            <ProgressBar percent={progress * 100}></ProgressBar>
        </>
    );
}

export default HackerCountdown