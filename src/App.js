import React, { Component } from 'react';
import { EventEmitter } from 'events';
import NavMenu from './containers/NavMenu';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.emitter = new EventEmitter();
  }

  render() {
    return (
      <div className="App">
        <NavMenu emitter={this.emitter} />
      </div>
    );
  }
}

export default App;