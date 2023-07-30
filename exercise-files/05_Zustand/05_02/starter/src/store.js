import { create } from "zustand";

const useCounter = create((set, get) => ({
  count: 0,
  increment: () => {
    set(() => ({
      count: get().input ? get().count + get().input : get().count + 1,
    }));
  },
  decrement: () => {
    if (get().count < 1) {
      return false;
    }
    set(() => ({
      count: get().count - 1,
    }));
  },
  reset: () =>
    set(() => ({
      count: 0,
    })),
}));

export default useCounter;
