import React, { useState, useEffect } from "react";

/**
 * A custom React Hook that returns the remaining time in hours, minutes, and seconds for a countdown timer.
 * @param {number} seconds - The total number of seconds for the countdown timer.
 * @returns {{hours, minutes, seconds}} - An object containing the remaining time values.
 * @example const { hours, minutes, seconds } = useCountdownTimer(3600);
 */
function useCountdownTimer(seconds) {
  const [secs, setSecs] = useState(seconds);
  useEffect(() => {
    setSecs(seconds);
  }, [seconds]);
  const [res, setRes] = useState({});
  useEffect(() => {
    const interval = setInterval(() => {
      setSecs((seconds) => seconds - 1);
    }, 1000);
    if (secs <= 0) clearInterval(interval);
    return () => clearInterval(interval);
  }, [secs]);

  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const remainingSeconds = secs % 60;

  useEffect(() => {
    setRes(() => ({
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds:
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds,
    }));
  }, [secs, hours, minutes, remainingSeconds, seconds]);

  return res;
}

export default useCountdownTimer;
