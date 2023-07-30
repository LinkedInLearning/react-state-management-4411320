import { useState } from "react";
import "./App.css";

/*
1 - generate two new random numbers
2 - Add the two random numbers together to get the sum
3 - Compare the sum to the user input
4 - If the sum is equal to the user input, display "You guessed right!"
5 - If the sum is not equal to the user input, display "Try Again :("
*/

function Form({ generate, guess, onChange, values }) {
  return (
    <div style={{ width: "50%" }}>
      <div className="p-2" style={{ width: "100%" }}>
        <div className="row">
          <div className="col-8">
            <span className="text-secondary h1 mb-2 mx-5">
              {values.random1}
            </span>
            <span className="text-secondary h1 mb-2 mx-5">
              {values.random2}
            </span>
          </div>
          <button onClick={generate} className="col-4 btn btn-info text-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </button>
        </div>
      </div>

      <form className="py-4 row g-0">
        <div className="col-8 px-2">
          <input
            type="number"
            className="form-control"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className="col-4">
          <button
            type="button"
            className="btn btn-info text-light"
            style={{ width: "100%" }}
            onClick={guess}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

function Result() {
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ width: "50%" }}
    >
      {/* <div className="d-flex justify-content-end align-items-end px-2 text-secondary"><p className="h3">00</p></div> */}
      <div className={`d-flex ${color} justify-content-center mb-5`}>
        <p className="h1">{message}</p>
      </div>
    </div>
  );
}

function App() {
  const [values, setValues] = useState({ random1: 0, random2: 0 });
  const [input, setInput] = useState(0);

  const generateRandomValues = () => {
    const random1 = Math.floor(Math.random() * 50);
    const random2 = Math.floor(Math.random() * 50);
    setValues({ random1, random2 });
  };
  const guessTheNumber = () => {};

  return (
    <div className="p-5" style={{ width: "80%" }}>
      <fieldset>
        <legend className="text-bold">Guess the Number</legend>
        <div className="d-flex justify-content-around">
          <Form
            generate={generateRandomValues}
            guess={guessTheNumber}
            onChange={setInput}
            values={values}
          />
          <Result result={result} input={input} />
        </div>
      </fieldset>
    </div>
  );
}

export default App;
