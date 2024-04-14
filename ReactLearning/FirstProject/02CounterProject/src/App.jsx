import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCount] = useState(90);

  const addValue = () => {
    counter++;
    setCount(counter);
  };

  const decreaseValue = () => {
    counter--;
    setCount(counter);
  };

  // function manipulateValue(isAdd)
  // {
  //   if(isAdd)
  //   {
  //     addValue();
  //   }
  //   else{
  //     decreaseValue();
  //   }
  // }

  function manipulateValue(isAdd) {
    if (isAdd) {
      counter++;
    } else {
      counter--;
    }
    setCount(counter);
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <br></br>
      {/* <button onClick={addValue}>Add</button> */}
      <button
        onClick={() => {
          manipulateValue(true);
        }}
      >
        Add
      </button>
      <br></br>
      <h1>Count : {counter}</h1>
      <br></br>
      {/* <button onClick={decreaseValue}>Remove</button> */}
      <button
        onClick={() => {
          manipulateValue(false);
        }}
      >
        Remove
      </button>
      <br></br>
    </>
  );
}

export default App;
