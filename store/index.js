import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import allDataSlice from "./dataSlice"
import msgSlice from "./msgSlice";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const combinedReducer = combineReducers({
  login: loginSlice,
  data: allDataSlice,
  msg: msgSlice
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const store = () =>
  configureStore({
    reducer
  })

export const wrapper = createWrapper(store, { debug: true })

export default store