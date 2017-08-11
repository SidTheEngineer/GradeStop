import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { COLORS, TAB_NAMES } from '../constants';

const NavMenu = props => (
  <Menu
    widths={3}
    compact
    size="large"
    color={ COLORS.PRIMARY }
    fixed="top"
    pointing
    inverted
  >
    <Menu.Item
      name={ TAB_NAMES.grade }
      active={ props.activeTab === TAB_NAMES.grade }
      onClick={ props.onTabClick }
      as={ Link }
      to="/"
    >
      <h3>Grade</h3>
    </Menu.Item>
    <Menu.Item
      name={ TAB_NAMES.gpa }
      active={ props.activeTab === TAB_NAMES.gpa }
      onClick={ props.onTabClick }
      as={ Link }
      to="gpa"
    >
      <h3>GPA</h3>
    </Menu.Item>
  </Menu>
);

export default NavMenu;