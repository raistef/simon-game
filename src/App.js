import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './Main.js';

class App extends Component {
  render() {
    return (
      
      <div className="text-center">
        <h1 className="col-xs-8"><span id="s">S</span>imon game</h1>
        <hr></hr>
        <Main />
        <p id="Copyright">Copyright © Stefany Raileanu 2017 </p>
      </div>
      
    );
  }
}

export default App;
