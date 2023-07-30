import { useContext, useRef } from "react";
import { Context } from "../context";

const Form = () => {
  const ref = useRef();
  const value = useContext(Context);
  const [state, dispatch] = value;

  const generate = () => {
    const random1 = Math.floor(Math.random() * 50);
    const random2 = Math.floor(Math.random() * 50);
    dispatch({ type: "setValues", payload: { values: { random1, random2 } } });
  };
  const guess = () => {
    dispatch({
      type: "checkResult",
      payload: { result: state.values.random1 + state.values.random2 },
    });
  };

  return (
    <div style={{ width: "50%" }}>
      <div className="p-2" style={{ width: "100%" }}>
        <div className="row">
          <div className="col-8">
            <span className="text-secondary h1 mb-2 mx-5">
              {state.values.random1}
            </span>
            <span className="text-secondary h1 mb-2 mx-5">
              {state.values.random2}
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
            ref={ref}
            type="number"
            className="form-control"
            onChange={(e) =>
              dispatch({ type: "setInput", payload: { input: e.target.value } })
            }
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
};
export default Form;
