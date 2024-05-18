import { useState, useEffect } from "react";

/**
 * Returns the current time as a Date object.
 *
 * @returns {Date} the current time
 */
export default function getTime() {
    const [time, setTime] = useState(new Date());

    /**
     * Gets current time every second.
     */
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    return time;
}
