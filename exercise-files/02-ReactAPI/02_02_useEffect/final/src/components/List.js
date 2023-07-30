import { useMemo } from "react";
import useStore from "../store";

const styles = {
  container: { width: "40%" },
  item_done: {
    textDecoration: "line-through",
    color: "gray",
    fontStyle: "italic",
  },
};

const List = () => {
  const isFiltered = useStore((state) => state.isFiltered);
  const all = useStore((state) => state.all);
  const items = useStore((state) => state.items);
  const check = useStore((state) => state.check);

  const allItems = useMemo(() => {
    if (isFiltered) {
      return items.filter(item => item.done)
    } 
    return all
  }, [isFiltered, items, all])
  return (
    <ul>
      {allItems.map((item) => (
        <li
          key={item.id}
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
