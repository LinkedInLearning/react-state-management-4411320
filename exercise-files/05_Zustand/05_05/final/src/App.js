import { useState, useRef, useMemo } from "react";
import "./App.css";

const styles = {
  container: {
    width: "40%",
    margin: "0 auto",
    background: "#ecf0f1",
    borderRadius: "4px",
  },
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

function Header({ count }) {
  return (
    <div className="p-4">
      <h1>Todos</h1>
      <p>{count}</p>
    </div>
  );
}

function Footer({ archive, filter, isVisible }) {
  return (
    <div
      className="d-flex justify-content-between p-2"
      style={{ background: "#bdc3c7" }}
    >
      <form
        className="d-flex justify-content-start align-self-center"
        style={{ height: "auto" }}
        onChange={(e) => filter(e.target.value)}
      >
        <input
          className="form-check-input"
          value="all"
          type="radio"
          name="radioFilter"
          id="flexRadioDefault1"
        />
        <label className="form-check-label" for="flexRadioDefault1">
          &nbsp; all &nbsp;
        </label>

        <input
          className="form-check-input"
          value="active"
          type="radio"
          name="radioFilter"
          id="flexRadioDefault2"
        />
        <label className="form-check-label" for="flexRadioDefault2">
          &nbsp; active &nbsp;
        </label>

        <input
          className="form-check-input"
          value="completed"
          type="radio"
          name="radioFilter"
          id="flexRadioDefault3"
        />
        <label className="form-check-label" for="flexRadioDefault2">
          &nbsp; completed &nbsp;
        </label>
      </form>
      <button
        onClick={archive}
        className="btn btn-sm btn-danger"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        clear completed
      </button>
    </div>
  );
}

function App() {
  const ref = useRef();
  const [list, setList] = useState(items);
  const [all, setAll] = useState(items);
  const [filter, setFilter] = useState("all");
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
    setAll([...all, newItem]);
    setList([...items, newItem]);
    setInput("");
    ref.current.value = null;
  };
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
    if (filter === "completed") {
      return all.filter((item) => item.done);
    }
    if (filter === "active") {
      return all.filter((item) => !item.done);
    }
    return all;
  }, [filter, all]);

  const count = useMemo(() => {
    if (!all.length) {
      return false;
    }
    return all.length > 1 ? `${all.length} items` : `${all.length} item`;
  }, [all]);

  return (
    <div className="mt-5" style={styles.container}>
      <Header count={count} />
      <form onSubmit={onSubmit} className="mb-4 px-4">
        <input
          ref={ref}
          className="form-control mb-4"
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <ul className="px-5">
        {allItems.map((item) => (
          <li
            style={item.done ? styles.item_done : {}}
            onClick={() => check(item.id)}
          >
            {item.task}
          </li>
        ))}
      </ul>
      <Footer archive={archive} filter={setFilter} isVisible={isVisible} />
    </div>
  );
}

export default App;
