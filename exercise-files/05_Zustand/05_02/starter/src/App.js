import { useState } from "react";
import "./App.css";

const styles = {
  container: { width: "40%" },
};

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h1 className="text-center mt-5">Counter</h1>
      <div className="container">
        <div className="App-border counter p-5" style={styles.container}>
          <p className="text-center text-light h1 mb-2">{count}</p>
          <div className="d-flex justify-content-center mb-3">
            <button
              onClick={increment}
              className="App-button-50 btn btn-outline-light btn-sm"
            >
              +
            </button>
            <button
              onClick={decrement}
              className="App-button-50 btn btn-outline-light btn-sm mx-2"
            >
              -
            </button>
            <button
              onClick={reset}
              className="App-button-50 btn btn-outline-dark btn-sm"
            >
              <img
                src="https://img.icons8.com/android/24/212529/recurring-appointment.png"
                alt="reset"
              />
            </button>
          </div>
        </div>

        <hr />
      </div>
    </div>
  );
}

export default App;
