import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl p-4 rounded-xl  mb-4">
        Tailwind Test
      </h1>
      <Card username="PAWAR" btnText="CLICK ME"/>
      <Card username="PATIL"/>

    </>
  );
}

export default App;
