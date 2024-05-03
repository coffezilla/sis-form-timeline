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
          <div></div>
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
          <ul className="flex bg-gray-100">
            {events.map((event, i) => {
              return (
                timelineCurrentIndex > i && (
                  <li
                    className={`border text-sm w-[3.33%] h-5 bg-green-200 relative`}
                    key={event.id}
                  >
                    {event.type === "signup" && (
                      <span className="bg-red-200 absolute -top-5 left-0 w-full block h-5 text-center">
                        {event.landingpage === "bpweek" ? "1" : "2"}
                      </span>
                    )}

                    {event.type !== "none" && (
                      <span className="bg-red-200 absolute -top-0 left-0 w-full block h-5 text-center">
                        {event.landingpage === "bpweek" ? "x1" : "x2"}
                      </span>
                    )}

                    {/* {event.id} */}
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
