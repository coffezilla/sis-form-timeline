import { useEffect, useState } from "react";
import {
  addSeconds,
  formatTimestamp,
  getSecondsDifference,
} from "../helpers/utils";

const Counter = ({ events, start }: { events: any[]; startEvent: string }) => {
  const TIMELINE_TOTAL = 10;
  const [timelineCurrentIndex, setTimelineCurrentIndex] =
    useState<number>(null);
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [finishTime, setFinishTime] = useState<any>(null);
  const [hasAllData, setHasAllData] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
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

        const diff = getSecondsDifference(new Date(), new Date(start));
        setTimelineCurrentIndex(diff + 1);
      }
      if (statusEvent === "NOT_HAPPENING") {
        console.log("not happening", statusEvent);
        setTimelineCurrentIndex(0);
        setIsHappening(false);
      }
      if (statusEvent === "DONE") {
        console.log("done", statusEvent);
        setIsHappening(false);
      }
      setIsLoaded(true);
    }, 1000);

    return () => {
      clearInterval(timer); // Clean up the timer on component unmount
    };
  };

  useEffect(() => {
    if (hasAllData) {
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

      if (statusEvent === "DONE") {
        console.log("done", statusEvent);
        setIsHappening(false);
        setTimelineCurrentIndex(TIMELINE_TOTAL);
        setIsLoaded(true);
      } else {
        runClock();
      }
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
    const endTime = addSeconds(start, TIMELINE_TOTAL);
    const endTimeFormatDB = formatTimestamp(endTime, "YYYY-MM-DD HH:II:SS");
    setFinishTime(endTimeFormatDB);

    setHasAllData(true);
  }, []);

  return (
    <div className="border">
      <h1>Counter</h1>
      {isLoaded && (
        <>
          <p>Current time: {currentTime}</p>
          <p>Start BP event: {start}</p>
          <p>End BP event: {finishTime}</p>
          <p>Status: {isHappening.toString()}</p>
          <p>loaded: {isLoaded.toString()}</p>
          <p>
            {timelineCurrentIndex}/{TIMELINE_TOTAL}
          </p>
        </>
      )}
      {/* Current Time: {currentTime.toLocaleTimeString()} */}
    </div>
  );
};

export default Counter;
