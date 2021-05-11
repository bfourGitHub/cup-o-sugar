
/* eslint-disable react/prefer-stateless-function */
// import React, { Component } from "react";
// import logo from "./logo.svg";
import React from "react";
import "./App.css";

import LandingLogin from "./pages/LandingLogin";
import GiveFeed from "./pages/GiveFeed";
import AddPost from "./pages/AddPost";
import HowItWorksPage from "./pages/HowItWorksPage";
import ProfilePage from "./pages/ProfilePage";
import GuidelinesPage from "./pages/GuidelinesPage";
import ChatPage from "./pages/ChatPage";

import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import { useAuthTokenStore } from "./utils/auth";


function App() {
  // ---- USER AUTHENTICATION ---- //
  // Use wherever we need to check if user is logged in or not.
  // Use the hook to reauthenticate stored tokens.
  // useAuthTokenStore();
  // isAuthenticated is true / false of if user is logged in
  // for components below can show if !isAuthenticated or if isAuthenticated
  // const isAuthenticated = useIsAuthenticated();
  // ---- END OF USER AUTHENTICATION VARIABLES ---- //
  // {isAuthenticated ? (
  //   <h1>You are logged in!</h1>
  // ) : (
  //   <h1>You are not logged in!</h1>
  // )} 

  const isDone = useAuthTokenStore();

  return (
    <Router>
            {isDone &&<Switch>
              <Route exact strict path="/" component={LandingLogin}></Route>
              <Route path="/feed" component={GiveFeed}></Route>
              <Route exact strict path="/post" component={AddPost}></Route>
              <Route exact strict path="/guidelines" component={GuidelinesPage}></Route>
              <Route exact strict path="/profile" component={ProfilePage}></Route>
              <Route exact strict path="/howitworks" component={HowItWorksPage}></Route>
              <Route exact strict paqth="/chat" component={ChatPage}></Route>
              <Route exact path="*" component={LandingLogin}></Route>
            </Switch>}
    </Router>
  );
}

export default App;
