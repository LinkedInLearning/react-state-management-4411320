import { useRecoilValue } from "recoil";
import { listItems } from "../common/selectors";

import styles from "../common/styles";
const [list, setList] = useRecoilState(listState);
const [all, setAll] = useRecoilState(allState);

const List = ({ allItems, check }) => {
  const allItems = useRecoilValue(listItems);
  const check = (id) => {
    const updated = all.map((item) => {
      return item.id === id ? { ...item, done: !item.done } : item;
    });
    setList(updated);
    setAll(updated);
  };
  return (
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
  );
};
export default List;
