import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { alertsReducer } from "./reducers/alertsReducer";
import { userReducer } from "./reducers/userReducer";

// Actions - call api
// Reducers - save the data

const composeEnhancers = composeWithDevTools({});

const rootReducers = combineReducers({
  alertsReducer,
  userReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
