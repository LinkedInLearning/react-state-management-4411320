import { useContext } from "react";
import { Context } from "../context";

function Score() {
  const value = useContext(Context);
  const [state] = value;
  return (
    <div className="d-flex justify-content-end">
      <p className="h3 px-2">{state.count}</p>
    </div>
  );
}
export default Score;
