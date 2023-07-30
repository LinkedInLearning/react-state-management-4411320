import { useState, useEffect } from "react";

function Result({ result, input }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const answer = result === parseInt(input);
    setMessage(answer ? "You guessed right!" : "Try Again :(");
    if (!result) {
      setMessage("");
    }
  }, [result, input]);

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ width: "50%" }}
    >
      <div className={`d-flex justify-content-center mb-5`}>
        <p className="h1">{message}</p>
      </div>
    </div>
  );
}
export default Result;
