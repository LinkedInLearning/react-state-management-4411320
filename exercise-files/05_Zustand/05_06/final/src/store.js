import { create } from "zustand";

const items = [
  { id: 1, task: "pay bills", done: false },
  { id: 2, task: "buy groceries", done: true },
  { id: 3, task: "learn Redux", done: false },
];

const useStore = create((set, get) => ({
  list: items,
  all: items,
  filter: "all",
  input: "", // updating text input changes in the store
  submit: (item) => {
    set(() => ({
      list: [...get().list, item],
      all: [...get().all, item],
      input: "",
    }));
  },
  setInput: (value) => {
    set(() => ({
      input: value,
    }));
  },
  check: (id) => {
    const all = get().all;
    const updated = all.map((item) => {
      return item.id === id ? { ...item, done: !item.done } : item;
    });
    set(() => ({
      items: updated,
      all: updated,
    }));
  },
  archive: () => {
    const all = get().all;
    const list = get().list;
    const all_filtered = all.filter((item) => !item.done);
    const filtered = list.filter((item) => !item.done);
    set(() => ({
      items: filtered,
      all: all_filtered,
    }));
  },
  setFilter: (option) => {
    set(() => ({
      filter: option,
    }));
  },
}));

export default useStore;
