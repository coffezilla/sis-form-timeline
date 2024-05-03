import { useEffect, useState } from "react";
import {
  addSeconds,
  checkEventStatus,
  formatTimestamp,
  getSecondsDifference,
} from "../helpers/utils";

const useEvent = (events: any, start: string) => {
  const TIMELINE_TOTAL = 30;
  const [timelineCurrentIndex, setTimelineCurrentIndex] =
    useState<number>(null);
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [finishTime, setFinishTime] = useState<any>(null);
  const [hasAllData, setHasAllData] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [eventStatus, setEventStatus] = useState<string | null>(null);

  //   result power bi bp analysis
  const [signupsA, setSignupsA] = useState<number>(0);
  const [signupsB, setSignupsB] = useState<number>(0);

  //
  const runClock = () => {
    const timer = setInterval(() => {
      //### DEBUG: Timer real time
      const currentTimeFormatDB = formatTimestamp(
        new Date(),
        "YYYY-MM-DD HH:II:SS"
      );
      setCurrentTime(currentTimeFormatDB);
      //###

      const _status = checkEventStatus(
        new Date(),
        new Date(start),
        new Date(finishTime)
      );
      setEventStatus(_status);

      if (_status === "HAPPENING") {
        const diff = getSecondsDifference(new Date(), new Date(start));
        updateSignupCounter(diff + 1);
        setTimelineCurrentIndex(diff + 1);
      }
      if (_status === "WAITING") {
        setTimelineCurrentIndex(0);
        updateSignupCounter(0);
      }

      setIsLoaded(true);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  };

  //
  const updateSignupCounter = (currentIndex: number) => {
    let _counterA = 0;
    let _counterB = 0;
    for (let i = 0; i < currentIndex; i++) {
      if (events[i].type === "signup" && events[i].landingpage === "bpweek")
        _counterA += 1;
      if (events[i].type === "signup" && events[i].landingpage === "gustavoapp")
        _counterB += 1;
    }
    setSignupsA(_counterA);
    setSignupsB(_counterB);
  };

  //
  useEffect(() => {
    if (hasAllData) {
      //### DEBUG: Timer real time
      const currentTimeFormatDB = formatTimestamp(
        new Date(),
        "YYYY-MM-DD HH:II:SS"
      );
      setCurrentTime(currentTimeFormatDB);
      //###

      const _status = checkEventStatus(
        new Date(),
        new Date(start),
        new Date(finishTime)
      );

      setEventStatus(_status);

      if (_status === "DONE") {
        setTimelineCurrentIndex(TIMELINE_TOTAL);
        updateSignupCounter(TIMELINE_TOTAL);
        setIsLoaded(true);
      } else {
        runClock();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAllData]);

  //
  useEffect(() => {
    const endTime = addSeconds(start, TIMELINE_TOTAL);
    const endTimeFormatDB = formatTimestamp(endTime, "YYYY-MM-DD HH:II:SS");
    setFinishTime(endTimeFormatDB);
    setHasAllData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoaded,
    currentTime,
    finishTime,
    eventStatus,
    timelineCurrentIndex,
    TIMELINE_TOTAL,
    signupsA,
    signupsB,
  };
};

export default useEvent;
