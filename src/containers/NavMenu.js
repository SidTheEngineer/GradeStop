import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter as Router } from 'react-router-dom';
import { EventEmitter } from 'events';
import COLORS from '../constants/colors';
import InputView from '../components/InputView';

// TODO: Get react router set up (learn about RR v4

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
  
  componentWillMount() {
    this.emitter = new EventEmitter();
  }

  onTabClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Router>
        <div className={css(styles.navMenu)}>
          <Menu
            widths={3}
            compact
            size="large"
            color={COLORS.PRIMARY}
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
          <InputView
            activeTab={ this.state.activeItem }
            emitter={this.emitter}
          >
            Calculate { this.state.activeItem }
          </InputView>
        </div>
      </Router>
    );
  }
}

export default NavMenu;
