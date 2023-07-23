import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { store,persistStoreForData } from './Redux/Store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistStoreForData}>
        <App />
      </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>
);
