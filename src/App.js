import React, { Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Header from "./components/Header/Header";
import InputItem from "./components/InputItem/InputItem";

function App() {
  return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/todo" component={InputItem} />
        </Switch>
      </Router>
  );
}

export default App;
