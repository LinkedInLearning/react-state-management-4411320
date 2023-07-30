import { useState, useRef } from "react";
import useStore from "../store";


const ArchiveButton = () => {
  const archive = useStore(state => state.archive)
  const isVisible = useStore((state) => state.all.some((item) => item.done));
    
  return (
    <button
      type="button"
      className="btn btn-danger btn-sm"
      style={{ visibility: `${isVisible ? "visible" : "hidden"} ` }}
      onClick={archive}
    >
      archive done
    </button>
  );
};

const ShowButton = () => {
  const show = useStore(state => state.show)
  return (
    <div className="form-check">
      <input
        id="show"
        type="checkbox"
        className="form-check-input"
        onChange={(e) => show(e.target.checked)}
      />
      <label className="form-check-label" for="show">
        {" "}
        show completed
      </label>
    </div>
  );
};
const Form = () => {
  const ref = useRef();
  const submit = useStore(state => state.submit)
  const [input, setInput] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return false;
    }
    const newItem = {
      id: new Date().getMilliseconds(),
      task: input,
      done: false,
    };
    submit(newItem)
    setInput("");
    ref.current.value = null;
  };
  return (
    <form onSubmit={onSubmit} className="mb-4">
      <input
        ref={ref}
        className="form-control mb-4"
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="d-flex justify-content-between">
        <ShowButton />
        <ArchiveButton />
      </div>
    </form>
  );
};
export default Form;
