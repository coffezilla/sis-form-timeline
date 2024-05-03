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
  ];

  const startEvent = "2024-05-03 11:12:30";

  return (
    <>
      <div>s</div>
      <Counter events={events} start={startEvent} />
    </>
  );
}

export default App;
