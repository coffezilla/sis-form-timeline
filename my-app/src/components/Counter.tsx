import { useEffect, useState } from "react";

const Counter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(timer); // Clean up the timer on component unmount
    };
  }, []); // Empty dependency array to run the effect only once on component mount
  return (
    <div className="border">
      <h1>Counter</h1>
      Current Time: {currentTime.toLocaleTimeString()}
    </div>
  );
};

export default Counter;
