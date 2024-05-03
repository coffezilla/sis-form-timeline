import useEvent from "../hooks/useEvent";

interface IProps {
  events: {
    id: number;
    name: string;
    landingpage: string;
    type: string;
  }[];
  start: string;
}

const Counter = ({ events, start }: IProps) => {
  const {
    TIMELINE_TOTAL,
    isLoaded,
    currentTime,
    finishTime,
    timelineCurrentIndex,
    eventStatus,
    signupsA,
    signupsB,
  } = useEvent(events, start);

  return (
    <div className="border">
      <h1 className="font-bold text-lg">
        BP Seguradora TIMER DE EVENTO de cadastro
      </h1>
      {isLoaded && (
        <>
          <p>Current time: {currentTime}</p>
          <p>Start BP event: {start}</p>
          <p>End BP event: {finishTime}</p>
          <p>Status: {eventStatus}</p>
          <hr />
          <h2 className="font-bold text-md">
            BP Week: Cadastro por campanha Landing page
          </h2>
          <p>Cadastro Landing Page BP Week (a): {signupsA}</p>
          <p>Cadastro Landing Page Gusttavo lima APP (b): {signupsB}</p>
          <p>loaded: {isLoaded.toString()}</p>
          <p>
            {timelineCurrentIndex}/{TIMELINE_TOTAL}
          </p>
          <ul>
            {events.map((event, i) => {
              return (
                timelineCurrentIndex > i && (
                  <li className={`border text-sm `} key={event.id}>
                    {event.id}: {i} {event.name} - {event.type} (
                    {event.landingpage})
                  </li>
                )
              );
            })}
          </ul>

          {eventStatus === "DONE" && <div>DONE</div>}
          {eventStatus === "HAPPENING" && <div>HAPPENING</div>}
          {eventStatus === "WAITING" && <div>WAITING</div>}
        </>
      )}
    </div>
  );
};

export default Counter;
