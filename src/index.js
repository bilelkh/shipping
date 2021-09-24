// index.js
import React from "react";
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import rootReducer from "./slices";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./index.css";

const store = configureStore({ reducer: rootReducer });

render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);
