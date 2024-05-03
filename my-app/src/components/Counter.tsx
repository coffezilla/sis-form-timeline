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
          <ul>
            {events.map((event, i) => {
              return (
                timelineCurrentIndex > i && (
                  <li className={`border text-sm `} key={event.id}>
                    {event.id}: {i} {event.name}
                  </li>
                )
              );
            })}
          </ul>

          {/* {eventStatus === "DONE" && <div>DONE</div>}
          {eventStatus === "HAPPENING" && <div>HAPPENING</div>}
          {eventStatus === "WAITING" && <div>WAITING</div>} */}
        </>
      )}
    </div>
  );
};

export default Counter;
