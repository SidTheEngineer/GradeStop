import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter as Router } from 'react-router-dom';
import _ from 'lodash';
import COLORS from '../constants/colors';
import GradeView from '../components/GradeView';
import GradeInput from '../components/GradeInput';
import GPAView from '../components/GPAView';
import GPAInput from '../components/GPAInput';

// TODO: Get react router set up (learn about RR v4
// TODO: Preserve inputs

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
      activeTab: 'Grade',
      gradeInputs: [<GradeInput key={ _.uniqueId('key:') } />],
      gpaInputs: [<GPAInput key={ _.uniqueId('key:') } />]
    };

    this.onTabClick = this.onTabClick.bind(this);
    this.addGradeInput = this.addGradeInput.bind(this);
    this.removeGradeInput = this.removeGradeInput.bind(this);
    this.addGpaInput = this.addGpaInput.bind(this);
    this.removeGpaInput = this.removeGpaInput.bind(this);
  }

  addGradeInput() {
    this.setState({ gradeInputs: this.state.gradeInputs.concat([<GradeInput key={ _.uniqueId('key:') } />]) });
  }

  removeGradeInput() {
    this.setState({ gradeInputs: this.state.gradeInputs.slice(0, -1) });
  }

  addGpaInput() {
    this.setState({ gpaInputs: this.state.gpaInputs.concat([<GPAInput key={ _.uniqueId('key:') } />]) });
  }

  removeGpaInput() {
    this.setState({ gpaInputs: this.state.gpaInputs.slice(0, -1) });
  }

  onTabClick(e, { name }) {
    this.setState({ activeTab: name });
  }

  componentWillMount() {
    this.props.emitter.addListener('addGradeInput', this.addGradeInput);
    this.props.emitter.addListener('removeGradeInput', this.removeGradeInput);
    this.props.emitter.addListener('addGpaInput', this.addGpaInput);
    this.props.emitter.addListener('removeGpaInput', this.removeGpaInput);
  }

  render() {
    const { activeTab, gradeInputs, gpaInputs } = this.state;
    const { emitter } = this.props;

    const activeView = activeTab === 'Grade'
      ? <GradeView
          activeTab={ activeTab } 
          emitter={ emitter } 
          title={`Calculate ${ activeTab }`}
          gradeInputs={ gradeInputs } 
        /> 
      : <GPAView 
          activeTab={ activeTab } 
          emitter={ emitter } 
          title={`Calculate ${ activeTab }`} 
          gpaInputs={ gpaInputs }
        />

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
              active={ activeTab === 'Grade' }
              onClick={ this.onTabClick }
            >

              <h3>Grade</h3>
            </Menu.Item>
            <Menu.Item
              name="GPA"
              active={ activeTab === 'GPA' }
              onClick={ this.onTabClick }
            >
              <h3>GPA</h3>
            </Menu.Item>
          </Menu>
          { activeView }
        </div>
      </Router>
    );
  }
}

export default NavMenu;
