import React, { Component } from 'react';
import { EventEmitter } from 'events';
import { BrowserRouter as Router } from 'react-router-dom';
import GradeStop from './containers/GradeStop';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.emitter = new EventEmitter();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <GradeStop emitter={this.emitter} />
        </Router>
      </div>
    );
  }
}

export default App;