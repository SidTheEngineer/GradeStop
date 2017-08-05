import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import COLORS from '../constants/colors';
import InputView from '../components/InputView';

const styles = StyleSheet.create({
  navMenu: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: COLORS.GRAY_1
  }
});

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
      <div className={css(styles.navMenu)}>
        <Menu
          widths={3}
          compact
          size="large"
          color="teal"
          fixed="top"
          pointing
          inverted
        >
          <Menu.Item
            name="Grade"
            active={ activeItem === 'Grade' }
            onClick={ this.onTabClick }
          >

            <h3>Grade</h3>
          </Menu.Item>
          <Menu.Item
            name="GPA"
            active={ activeItem === 'GPA' }
            onClick={ this.onTabClick }
          >
            <h3>GPA</h3>
          </Menu.Item>
        </Menu>
        <InputView activeTab={ this.state.activeItem }>Calculate { this.state.activeItem }</InputView>
      </div>
    );
  }
}

export default NavMenu;
