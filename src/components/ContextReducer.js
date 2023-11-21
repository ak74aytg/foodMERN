import React, { createContext, useContext, useReducer } from "react";

const contextState = createContext();
const contextDispatch = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          img: action.img,
          qty: action.qty,
          size: action.size,
          price: action.price,
        },
      ];

    case "delete":
      let newList = [...state];
      newList.splice(action.index, 1);
      return newList;

    case "update":
      let listt = [...state];
      let item = listt[action.index];
      item.qty = action.qty;
      item.price = action.price;
      listt[action.index] = item;
      return listt;

    case "drop":
      state = [];
      return state;

    default:
      console.log("something went wrong");
      break;
  }
};

function ContextReducer({ children }) {
  const [state, dispatch] = useReducer(Reducer, []);

  return (
    <contextState.Provider value={state}>
      <contextDispatch.Provider value={dispatch}>
        {children}
      </contextDispatch.Provider>
    </contextState.Provider>
  );
}

export function useStateContext() {
  return useContext(contextState);
}

export function useDispatchContext() {
  return useContext(contextDispatch);
}

export default ContextReducer;
