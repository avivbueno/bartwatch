import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import initSubscriber from "redux-subscriber";
import rootReducer from "./reducers";

//Adding middleware for async store updates
const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

//Creating a redux store to handle the entire app state
const store = createStore(rootReducer, applyMiddleware(...middleware));

//Creating a way to access store outside of react for leaflet render
initSubscriber(store);

export default store;
