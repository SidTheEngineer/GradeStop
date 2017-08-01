import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

import InputView from './components/InputView';

class NavMenu extends Component {
  constructor() {
    super();

    this.state = {
      activeItem: 'Grade'
    };

    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu
          widths={3}
          compact
          size={"large"}
          color={"blue"}
          pointing
        >
          <Menu.Item
            name="Grade"
            active={ activeItem === 'Grade' }
            onClick={ this.onTabClick }
          >
            Grade
          </Menu.Item>
          <Menu.Item
            name="GPA"
            active={ activeItem === 'GPA' }
            onClick={ this.onTabClick }
          >
            GPA
          </Menu.Item>
        </Menu>
        <InputView tab={ this.state.activeItem } />
      </div>

    );
  }
}

export default NavMenu;
