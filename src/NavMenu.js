import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

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
      <Menu
        widths={3}
        compact
        size={"large"}
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
    );
  }
}

export default NavMenu;
