import { useEffect, useState } from "react";
import {
  addSeconds as addSeconds,
  convertTimestampToNew,
  formatTimestamp,
} from "../helpers/utils";

const Counter = ({ match, events }: { match: string; events: any }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [endTime, setEndTime] = useState<any>(null);
  const [matchTime, setMatchTime] = useState<any>(null);
  const fullTimer = 4;

  //
  const [timelineEvents, setTimelineEvents] = useState<any>([]);

  // setTimelineEvents(timelineBase);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      const currentTime = new Date();
      const matchTimeNew = new Date(matchTime);
      // console.log(new Date());
      // console.log(matchTimeNew);
      if (currentTime > matchTimeNew) {
        console.log("Maior", currentTime, matchTimeNew);
      } else {
        console.log("Menor");
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(timer); // Clean up the timer on component unmount
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  useEffect(() => {
    if (endTime && matchTime) {
      const totalEvents =
        events.length <= fullTimer / 2 ? events.length : fullTimer / 2;

      // create tray
      const gapBetweenEvents = fullTimer / totalEvents;

      console.log("Match", convertTimestampToNew(matchTime));

      let currentEvent = 0;
      let count = 0;
      const timelineBase = [];
      for (let i = 0; i < fullTimer; i++) {
        count += 1;
        const currentTimeEvent = addSeconds(matchTime, i);
        const id = i;
        let type = "nothing";

        if (count === gapBetweenEvents) {
          count = 0;
          const hasEventsLeft = currentEvent < totalEvents;
          if (hasEventsLeft) {
            type = "goal";
            currentEvent += 1;
            // addSeconds(match, 10)

            // console.log("event:", currentEvent);
          } else {
            type = "too much";

            // console.log("has no event");
          }
        } else {
          type = "too much";

          // console.log("pass", i);
        }

        timelineBase.push({
          time: currentTimeEvent,
          event: id,
          type: type,
        });
      }

      console.log("yeads", timelineBase);
    }
  }, [endTime, matchTime]);

  useEffect(() => {
    setEndTime(addSeconds(match, fullTimer));
    setMatchTime(formatTimestamp(match));
  }, []);

  return (
    <div className="border">
      <h1>Counter</h1>
      <p>Data atual: {formatTimestamp(currentTime.toString())}</p>
      <p>Match time: {matchTime}</p>
      <p>Match end: {endTime}</p>
      {timelineEvents.map((event, i) => {
        return <p key={i}>{event}</p>;
      })}
      {/* Current Time: {currentTime.toLocaleTimeString()} */}
    </div>
  );
};

export default Counter;
