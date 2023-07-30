import styles from "../common/styles";
const List = ({ allItems, check }) => {
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
