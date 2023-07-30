import { useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Form from "./components/Form";
import List from "./components/List";
import { listState, allState, filterState, inputValue } from "./common/atoms";
import { listItems, itemsCount } from "./common/selectors";
import styles from "./common/styles";
import "./App.css";

function App() {
  const ref = useRef();
  const [list, setList] = useRecoilState(listState);
  const [all, setAll] = useRecoilState(allState);
  const [input, setInput] = useRecoilState(inputValue);
  const filtering = useSetRecoilState(filterState);
  const allItems = useRecoilValue(listItems);
  const isVisible = useRecoilValue(itemsCount);

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
    setList([...list, newItem]);
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

  return (
    <div className="container mt-5 " style={styles.container}>
      <Form
        ref={ref}
        setInput={setInput}
        isVisible={isVisible}
        archive={archive}
        onSubmit={onSubmit}
        show={show}
      />
      <List check={check} allItems={allItems} />
    </div>
  );
}

export default App;
