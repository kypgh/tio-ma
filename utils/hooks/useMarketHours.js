import moment from "moment";
import { useEffect, useState } from "react";

const testAdd = 0;

function createHoursArray(hours, timeZone) {
  let todaysHours = hours.map(({ open, close }) => ({
    open: moment(open, "HH:mm A", timeZone).add(testAdd, "day"),
    close: moment(close, "HH:mm A", timeZone).add(testAdd, "day"),
  }));

  let nextDaysHours = hours.map(({ open, close }) => {
    let todayOpen = moment(open, "HH:mm A", timeZone).add(testAdd, "day").day();
    let todayClose = moment(close, "HH:mm A", timeZone)
      .add(testAdd, "day")
      .day();
    return {
      open: moment(open, "HH:mm A", timeZone).add(
        (todayOpen === 6 ? 3 : todayOpen === 7 ? 2 : 1) + testAdd,
        "day"
      ),
      close: moment(close, "HH:mm A", timeZone).add(
        (todayClose === 6 ? 3 : todayClose === 7 ? 2 : 1) + testAdd,
        "day"
      ),
    };
  });
  return [...todaysHours, ...nextDaysHours];
}

function getTime(unixHours, time) {
  return unixHours
    .map((v) => Object.values(v))
    .flat()
    .reduce((acc, curr) => {
      if (time.isBefore(curr) && curr.diff(time, "seconds") < acc) {
        return curr.diff(time, "seconds");
      }
      return acc;
    }, 10000000);
}

function getTimeFromTimezone(timeZone) {
  return moment(new Date(new Date().toLocaleString("en-US", { timeZone }))).add(
    testAdd,
    "day"
  );
}

function useMarketHours(hours, timeZone) {
  const [time, setTime] = useState(getTimeFromTimezone(timeZone));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeFromTimezone(timeZone));
    }, 1000 * 5);
    return () => clearInterval(interval);
  }, []);

  const unixHours = createHoursArray(hours, timeZone);

  const isMarketOpen = unixHours.some(({ open, close }) =>
    time.isBetween(open, close)
  );

  const status = isMarketOpen ? "Open" : "Closed";
  let diffTime = getTime(unixHours, time);

  const h = Math.floor(diffTime / 3600);
  const minutes = Math.floor((diffTime % 3600) / 60);
  const remainingSeconds = diffTime % 60;

  return {
    time,
    status,
    isMarketOpen,
    hours: h,
    minutes,
    remainingSeconds,
  };
}

export default useMarketHours;
