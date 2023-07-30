import { create } from "zustand";
import { devtools } from 'zustand/middleware'

const useCounter = create(devtools((set, get) => ({
  count: 0,
  increment: () => {
    set(() => ({
      count: get().count + 1
    }))
  },
  decrement: () => {
    if (get().count < 1) { return false }
    set(() => ({
      count: get().count - 1
    }))
  }, 
  incrementBy10: () => {
    set(() => ({
      count: get().count + 10
    }))
  },
  decrementBy10: () => {
    set(() => ({
      count: get().count - 10 > 0 ?  get().count - 10 : 0
    }))
  },
  reset: () => 
    set(() => ({
      count: 0
    }))
})), { name: "counter"});

export default useCounter;
