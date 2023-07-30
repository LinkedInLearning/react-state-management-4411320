import { selector } from "recoil";
import { listState, filterState, allState } from "./atoms";

export const listItems = selector({
  key: "listItems",
  get: ({ get }) => {
    const all = get(allState);
    const isFiltered = get(filterState); // you can replace 'bool' with 'isFiltered'
    if (isFiltered) {
      return all.filter((item) => item.done);
    }
    return all;
  },
});
export const itemsCount = selector({
  key: "itemsCount", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const list = get(listState);
    return list.some((item) => !!item.done);
  },
});
