import { useState } from "react";
import Counter from "./components/Counter";

function App() {
  // event bp lead capture
  const events = [
    {
      id: 1,
      name: "a",
      landingpage: "bpweek",
      type: "signup",
    },
    {
      id: 2,
      name: "b",
      landingpage: "bpweek",
      type: "none",
    },
    {
      id: 3,
      name: "c",
      landingpage: "bpweek",
      type: "none",
    },
    {
      id: 4,
      name: "d",
      landingpage: "bpweek",
      type: "none",
    },
    {
      id: 5,
      name: "e",
      landingpage: "gustavoapp",
      type: "signup",
    },
    {
      id: 6,
      name: "f",
      landingpage: "bpweek",
      type: "none",
    },
    {
      id: 7,
      name: "g",
      landingpage: "bpweek",
      type: "none",
    },
    {
      id: 8,
      name: "h",
      landingpage: "bpweek",
      type: "none",
    },
    {
      id: 9,
      name: "i",
      landingpage: "bpweek",
      type: "none",
    },
    {
      id: 10,
      name: "j",
      landingpage: "gustavoapp",
      type: "signup",
    },
  ];

  const startEvent = "2024-05-03 11:45:30";

  return (
    <>
      <div>s</div>
      <Counter events={events} start={startEvent} />
    </>
  );
}

export default App;
