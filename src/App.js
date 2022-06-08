import { useState } from "react";
import "./App.css";
import Clock from "./Clock/Clock";
import Timer from "./SetTimer/SetTimer";
function App() {
  let [position, setPosition] = useState(0);
  return (
    <>
      {
        position == 0 ? <Clock /> : <Timer setState={setPosition} state={position} />
      }
      <Button state={position} setState={setPosition} />
    </>
  );
}

function Button({ setState, state }) {
  let label = ["Set Timer", "Start", "Horloge"];
  return (
    <button className="btn" onClick={() => setState(state == 2 ? 0 : state + 1)}>{label[state]}</button>
  );
}



export default App;
