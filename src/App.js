import React, { Component } from 'react';
import { EventEmitter } from 'events';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Switch>
            <Route render={ routeProps => (
              <GradeStop emitter={this.emitter} {...routeProps} />
            )} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;