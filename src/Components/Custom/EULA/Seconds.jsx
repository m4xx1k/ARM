import React, { useState, useEffect } from 'react';

const Seconds = () => {
    const [seconds, setSeconds] = useState(10);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);

        // Очищення інтервалу при завершенні компонента
        return () => clearInterval(countdownInterval);
    }, [seconds]);

    return (
        <div>
            {seconds > 0 && <span>{seconds}</span>}
        </div>
    );
};

export default Seconds;
