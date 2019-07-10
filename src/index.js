import React from "react";
import ReactDOM from "react-dom";
import store from "./js/store.js";
import { Provider } from "react-redux";
import App from "./js/App.jsx";

//Getting the root element for the app
const rootElement = document.getElementById("root");

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
