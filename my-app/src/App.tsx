import { useState } from "react";
import Counter from "./components/Counter";

function App() {
  // live bp seguradora sign up
  // 1,2,3,4,5,6,7,8,9

  // start:
  // end:

  const events = [
    {
      id: 1,
      name: "1a",
    },
    {
      id: 2,
      name: "2b",
    },
  ];

  return (
    <>
      <div>s</div>
      <Counter match={"02/14/2024 20:00:00"} events={events} />
    </>
  );
}

export default App;

/*

tempo inicial = 12/12/12 00:00:00
tempo em segundos = 

atual: 00:00:20
tempo: 00:00:30
final: 00:01:00

*/
