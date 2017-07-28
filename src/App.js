import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

// TODO: Set up the initial navbar

class App extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item
          name="Grade"
          active
        >
          Grade
        </Menu.Item>
        <Menu.Item
          name="GPA"
        >
          GPA
        </Menu.Item>
      </Menu>
    );
  }
}

export default App;
