import { createStore } from "redux";
import { combineReducers } from "redux";
import task_store from "./task_store";

const reducers = combineReducers({ task_store });
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
