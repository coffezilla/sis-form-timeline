import { useState } from "react";
import Counter from "./components/Counter";

function App() {
  // event bp lead capture
  const events = [
    {
      id: 1,
      name: "a",
    },
    {
      id: 2,
      name: "b",
    },
    {
      id: 3,
      name: "c",
    },
    {
      id: 4,
      name: "d",
    },
    {
      id: 5,
      name: "e",
    },
    {
      id: 6,
      name: "f",
    },
    {
      id: 7,
      name: "g",
    },
    {
      id: 8,
      name: "h",
    },
    {
      id: 9,
      name: "i",
    },
    {
      id: 10,
      name: "j",
    },
  ];

  const startEvent = "2024-05-03 11:25:30";

  return (
    <>
      <div>s</div>
      <Counter events={events} start={startEvent} />
    </>
  );
}

export default App;
