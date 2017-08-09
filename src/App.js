import React, { Component } from 'react';
import { EventEmitter } from 'events';
import { BrowserRouter as Router } from 'react-router-dom';
import NavMenu from './containers/NavMenu';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.emitter = new EventEmitter();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavMenu emitter={this.emitter} />
        </Router>
      </div>
    );
  }
}

export default App;