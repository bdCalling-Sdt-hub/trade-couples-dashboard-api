import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js"
import { Toaster } from 'react-hot-toast';
import {UserProvider} from "./provider/User.jsx"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider> 
      <App /> 
      </UserProvider>
      <Toaster />
    </Provider>
 
  </React.StrictMode>
);
