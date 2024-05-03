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
  const [eventStatus, setEventStatus] = useState<string | null>(null);

  const runClock = () => {
    const timer = setInterval(() => {
      const currentTimeFormatDB = formatTimestamp(
        new Date(),
        "YYYY-MM-DD HH:II:SS"
      );
      setCurrentTime(currentTimeFormatDB);

      const _status = checkEventStatus(
        new Date(),
        new Date(start),
        new Date(finishTime)
      );
      setEventStatus(_status);

      if (_status === "HAPPENING") {
        console.log("happening");

        const diff = getSecondsDifference(new Date(), new Date(start));
        setTimelineCurrentIndex(diff + 1);
      }
      if (_status === "WAITING") {
        console.log("not happening", _status);
        setTimelineCurrentIndex(0);
      }
      if (_status === "DONE") {
        console.log("done", _status);
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

      const _status = checkEventStatus(
        new Date(),
        new Date(start),
        new Date(finishTime)
      );

      setEventStatus(_status);

      if (_status === "DONE") {
        console.log("done", _status);
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

    let status = "WAITING";

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
      <h1>BP Seguradora TIMER DE EVENTO de cadastro</h1>
      {isLoaded && (
        <>
          <p>Current time: {currentTime}</p>
          <p>Start BP event: {start}</p>
          <p>End BP event: {finishTime}</p>
          <p>Status: {eventStatus}</p>
          <p>loaded: {isLoaded.toString()}</p>
          <p>
            {timelineCurrentIndex}/{TIMELINE_TOTAL}
          </p>

          {eventStatus === "DONE" && <div>DONE</div>}
          {eventStatus === "HAPPENING" && <div>HAPPENING</div>}
          {eventStatus === "WAITING" && <div>WAITING</div>}
        </>
      )}
      {/* Current Time: {currentTime.toLocaleTimeString()} */}
    </div>
  );
};

export default Counter;
