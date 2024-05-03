import { useEffect, useState } from "react";
import {
  addSeconds,
  formatTimestamp,
  getSecondsDifference,
} from "../helpers/utils";
import useEvent from "../hooks/useEvent";

const Counter = ({ events, start }: { events: any[]; startEvent: string }) => {
  const {
    isLoaded,
    currentTime,
    finishTime,
    timelineCurrentIndex,
    eventStatus,
    TIMELINE_TOTAL,
  } = useEvent(events, start);

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
