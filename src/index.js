import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import App from "./js/App.jsx";
import rootReducer from "./js/reducers";

//Getting the root element for the app
const rootElement = document.getElementById("root");

//Adding middleware for async store updates
const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

//Creating a redux store to handle the entire app state
const store = createStore(rootReducer, applyMiddleware(...middleware));

//A Try to setup ReactDOM
rootElement
  ? ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      rootElement
    )
  : false;

//In case there is a problem with ReactDOM it shows an alert box
if (!rootElement) {
  alert("Root element render error (wrapper)");
}
