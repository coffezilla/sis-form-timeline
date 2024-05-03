import { useEffect, useState } from "react";
import { addSeconds, formatTimestamp } from "../helpers/utils";

const Counter = ({ events, start }: { events: any[]; startEvent: string }) => {
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [finishTime, setFinishTime] = useState<any>(null);
  const [hasAllData, setHasAllData] = useState<boolean>(false);
  // const [isFinished, setIsFinished] = useState<boolean>(null);
  const [isHappening, setIsHappening] = useState<boolean>(false); // if is happening is running

  const runClock = () => {
    const timer = setInterval(() => {
      const currentTimeFormatDB = formatTimestamp(
        new Date(),
        "YYYY-MM-DD HH:II:SS"
      );
      setCurrentTime(currentTimeFormatDB);

      const statusEvent = checkEventStatus(
        new Date(),
        new Date(start),
        new Date(finishTime)
      );

      if (statusEvent === "HAPPENING") {
        console.log("happening");
        setIsHappening(true);
      }
      if (statusEvent === "NOT_HAPPENING") {
        console.log("not happening", statusEvent);
        setIsHappening(false);
      }
      if (statusEvent === "DONE") {
        console.log("done", statusEvent);
        setIsHappening(false);
      }
    }, 1000);

    return () => {
      clearInterval(timer); // Clean up the timer on component unmount
    };
  };

  useEffect(() => {
    if (hasAllData) {
      runClock();
    }
  }, [hasAllData]); // Empty dependency array to run the effect only once on component mount

  //
  const checkEventStatus = (current: any, start: any, finished: any) => {
    const currentTimeFormatDate = current;
    const startTimeFormatDate = new Date(start);
    const finishTimeFormatDate = new Date(finished);

    let status = "NOT_HAPPENING";

    if (
      currentTimeFormatDate > startTimeFormatDate &&
      currentTimeFormatDate < finishTimeFormatDate
    ) {
      status = "HAPPENING";
    }

    if (currentTimeFormatDate > finishTimeFormatDate) {
      status = "DONE";
    }

    return status;
  };

  useEffect(() => {
    const endTime = addSeconds(start, 180);
    const endTimeFormatDB = formatTimestamp(endTime, "YYYY-MM-DD HH:II:SS");
    setFinishTime(endTimeFormatDB);

    setHasAllData(true);
  }, []);

  return (
    <div className="border">
      <h1>Counter</h1>
      <p>Current time: {currentTime}</p>
      <p>Start BP event: {start}</p>
      <p>End BP event: {finishTime}</p>
      <p>Status: {isHappening.toString()}</p>
      {/* Current Time: {currentTime.toLocaleTimeString()} */}
    </div>
  );
};

export default Counter;
