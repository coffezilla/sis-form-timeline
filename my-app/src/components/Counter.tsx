const Counter = () => {
  const events = [
    {
      id: 1,
      name: "1a",
    },
    {
      id: 2,
      name: "2b",
    },
    {
      id: 3,
      name: "1a",
    },
    {
      id: 4,
      name: "2b",
    },
    {
      id: 5,
      name: "1a",
    },
    {
      id: 1,
      name: "1a",
    },
    {
      id: 2,
      name: "2b",
    },
    {
      id: 3,
      name: "1a",
    },
    {
      id: 4,
      name: "2b",
    },
    {
      id: 5,
      name: "1a",
    },
  ];

  const fullTimer = 30;
  const totalEvents =
    events.length <= fullTimer / 2 ? events.length : fullTimer / 2;

  // create tray
  const gapBetweenEvents = fullTimer / totalEvents;

  let currentEvent = 0;
  let count = 0;
  for (let i = 0; i < fullTimer; i++) {
    count += 1;

    if (count === gapBetweenEvents) {
      count = 0;
      const hasEventsLeft = currentEvent < totalEvents;
      if (hasEventsLeft) {
        currentEvent += 1;
        console.log("event:", currentEvent);
      } else {
        console.log("has no event");
      }
    } else {
      console.log("pass", i);
    }
  }

  return (
    <div className="border">
      <h1>Counter</h1>
    </div>
  );
};

export default Counter;
