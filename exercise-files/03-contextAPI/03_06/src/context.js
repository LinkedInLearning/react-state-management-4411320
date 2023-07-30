import { createContext, useReducer } from "react";

export const Context = createContext();

const initialState = {
  count: 0,
  values: { random1: 0, random2: 0 },
  result: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "setValues":
      return {
        ...state,
        values: action.payload.values,
        result: "",
      };
    case "setInput":
      return {
        ...state,
        input: action.payload.input,
      };
    case "checkResult":
      return {
        ...state,
        result: action.payload.result,
        values: { random1: 0, random2: 0 },
        count:
          action.payload.result === parseInt(state.input)
            ? state.count + 1
            : state.count,
      };
    default:
      return state;
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
export default Provider;
