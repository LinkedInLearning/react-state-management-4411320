import { useState, useRef, useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import "./App.css";

const styles = {
  container: { width: "40%" },
  item_done: {
    textDecoration: "line-through",
    color: "gray",
    fontStyle: "italic",
  },
};

const items = [
  { id: 1, task: "pay bills", done: false },
  { id: 2, task: "buy groceries", done: false },
  { id: 3, task: "learn Redux", done: false },
];

// 1 - breaking up the source of truth into Atoms
const listState = atom({
  key: "listState",
  default: items,
});
const allState = atom({
  key: "allState", // unique ID (with respect to other atoms/selectors)
  default: items, // default value (aka initial value)
});
const filterState = atom({
  key: "filterState",
  default: false,
});

const inputValue = atom({
  key: "inputValue",
  default: false,
});

function App() {
  const ref = useRef();
  const [list, setList] = useRecoilState(listState);
  const [all, setAll] = useRecoilState(allState);
  const [isFiltered, filtering] = useRecoilState(filterState);
  const [input, setInput] = useRecoilState(inputValue);

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
    setAll([...all, newItem]);
    setList([...items, newItem]);
    setInput("");
    ref.current.value = null;
  };
  const show = (e) => filtering(e.target.checked);
  const check = (id) => {
    const updated = all.map((item) => {
      return item.id === id ? { ...item, done: !item.done } : item;
    });
    setList(updated);
    setAll(updated);
  };
  const archive = () => {
    const all_filtered = all.filter((item) => !item.done);
    const filtered = list.filter((item) => !item.done);
    setList(filtered);
    setAll(all_filtered);
  };

  const isVisible = useMemo(() => {
    return all.some((item) => item.done);
  }, [all]);

  const allItems = useMemo(() => {
    if (isFiltered) {
      return all.filter((item) => item.done);
    }
    return all;
  }, [all, isFiltered]);
  return (
    <div className="container mt-5 " style={styles.container}>
      <form onSubmit={onSubmit} className="mb-4">
        <input
          ref={ref}
          className="form-control mb-4"
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="d-flex justify-content-between">
          <div className="form-check">
            <input
              id="show"
              type="checkbox"
              className="form-check-input"
              onChange={show}
            />
            <label className="form-check-label" for="show">
              {" "}
              show completed
            </label>
          </div>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            style={{ visibility: `${isVisible ? "visible" : "hidden"} ` }}
            onClick={archive}
          >
            archive completed
          </button>
        </div>
      </form>
      <ul>
        {allItems.map((item) => (
          <li
            style={item.done ? styles.item_done : {}}
            onClick={() => check(item.id)}
          >
            {item.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
