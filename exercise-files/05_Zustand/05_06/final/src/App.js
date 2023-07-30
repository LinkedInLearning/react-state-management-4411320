import { useRef, useMemo } from "react";
import useStore from "./store";
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

function Header() {
  const { all } = useStore();
  const count = useMemo(() => {
    if (!all.length) {
      return false;
    }
    return all.length > 1 ? `${all.length} items` : `${all.length} item`;
  }, [all]);

  return (
    <div className="p-4">
      <h1>Todos</h1>
      <p>{count}</p>
    </div>
  );
}

function Form() {
  const ref = useRef();
  const { submit, setInput, input } = useStore();
  const onSubmit = (e) => {
    e.preventDefault();
    if (input) {
      submit({ id: Number(new Date()), task: input, done: false });
    }
    ref.current.value = null; // to access and clear the text input
  };
  return (
    <form onSubmit={onSubmit} className="mb-4 px-4">
      <input
        ref={ref}
        className="form-control mb-4"
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}

function Footer() {
  const { all, setFilter, archive } = useStore();
  const isVisible = useMemo(() => {
    return all.some((item) => item.done);
  }, [all]);
  return (
    <div
      className="d-flex justify-content-between p-2"
      style={{ background: "#bdc3c7" }}
    >
      <form
        className="d-flex justify-content-start align-self-center"
        style={{ height: "auto" }}
        onChange={(e) => setFilter(e.target.value)}
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

function List() {
  const { check, all, filter } = useStore();
  const allItems = useMemo(() => {
    if (filter === "completed") {
      return all.filter((item) => item.done);
    }
    if (filter === "active") {
      return all.filter((item) => !item.done);
    }
    return all;
  }, [filter, all]);

  return (
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
  );
}

function App() {
  return (
    <div className="mt-5" style={styles.container}>
      <Header />
      <Form />
      <List />
      <Footer />
    </div>
  );
}

export default App;
