import React, { Component } from 'react';
import { EventEmitter } from 'events';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
          {/*
          TODO: Create a new results container route here, will probably
          have one for class grade and one for gpa.
          */}
          <Route render={({ history }) => (
            <GradeStop emitter={this.emitter} history={history} />
          )} />
        </Router>
      </div>
    );
  }
}

export default App;