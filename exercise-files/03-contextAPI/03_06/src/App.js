import { useContext } from "react";
import { Context } from "./context";
import Form from "./components/Form";
import Result from "./components/Result";
import Score from "./components/Score";
import "./App.css";

/*
1 - generate two new random numbers
2 - Add the two random numbers together to get the sum
3 - Compare the sum to the user input
4 - If the sum is equal to the user input, display "You guessed right!"
5 - If the sum is not equal to the user input, display "Try Again :("
*/

function App() {
  const value = useContext(Context);
  const [state] = value;

  return (
    <div className="p-5" style={{ width: "80%" }}>
      <fieldset>
        <legend className="text-bold">Guess the Number</legend>
        <Score />
        <div className="d-flex justify-content-around">
          <Form />
          <Result />
        </div>
      </fieldset>
    </div>
  );
}

export default App;
