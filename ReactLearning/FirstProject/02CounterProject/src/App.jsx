import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCount] = useState(90)
  // let counter = 15;

  const addValue = () => {

    counter++;
    setCount(counter);
  };

  const decreaseValue = () => {

    counter--;
    setCount(counter);
  };


  return (
    <>
      <h1>Chai aur React</h1>
      <br></br>
      <button onClick={addValue}>Add</button>
      <br></br>
      <h1>Count : {counter}</h1>
      <br></br>
      <button onClick={decreaseValue}>Remove</button>
      <br></br>
    </>
  );
}

export default App;
