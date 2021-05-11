import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
import "../src/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreProvider } from "./store/AuthStore";
import { ContactsProvider } from "./store/ContactsProvider";
import { ConversationsProvider } from "./store/ConversationsProvider";


ReactDOM.render(
    <StoreProvider>
      <ContactsProvider>
        <ConversationsProvider>
        <App />
        </ConversationsProvider>
        </ContactsProvider>
    </StoreProvider>,
  document.getElementById("root")
);
// registerServiceWorker();
