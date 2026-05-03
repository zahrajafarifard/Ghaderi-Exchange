import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/font/IRANSansWeb.ttf";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";

import Reducer from "./store/reducer";

const rootReducer = combineReducers({
  Reducer: Reducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
