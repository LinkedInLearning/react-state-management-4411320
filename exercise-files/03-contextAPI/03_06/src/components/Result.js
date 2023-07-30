import { useState, useEffect, useContext } from "react";
import { Context } from "../context";

function Result() {
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const value = useContext(Context);
  const [state] = value;

  useEffect(() => {
    const answer = state.result === parseInt(state.input);
    setColor(answer ? "text-success" : "text-danger");
    setMessage(answer ? "You guessed right!" : "Try Again :(");
    if (!state.result) {
      setMessage("");
    }
  }, [state.result, state.input]);

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ width: "50%" }}
    >
      <div className={`d-flex ${color} justify-content-center mb-5`}>
        <p className="h1">{message}</p>
      </div>
    </div>
  );
}
export default Result;
