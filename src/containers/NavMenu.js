import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import { Route, Link, Switch } from 'react-router-dom';
import _ from 'lodash';
import COLORS from '../constants/colors';
import GradeView from '../components/GradeView';
import GradeInput from '../components/GradeInput';
import GPAView from '../components/GPAView';
import GPAInput from '../components/GPAInput';

// TODO: Try and find a way to preserve input state (this may come with setting
// up RR4).

const styles = StyleSheet.create({
  navMenu: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: COLORS.GRAY_1
  },
  pageNotFound: {
    paddingTop: '80px',
    textAlign: 'center',
    color: COLORS.GRAY_7
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
    this.switchView = this.switchView.bind(this);
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

  switchView(pathName) {
    if (pathName === '/')
      this.setState({ activeTab: 'Grade' });
    else 
      this.setState({ activeTab: 'GPA' });
  }

  componentWillMount() {
    this.props.emitter.addListener('addGradeInput', this.addGradeInput);
    this.props.emitter.addListener('removeGradeInput', this.removeGradeInput);
    this.props.emitter.addListener('addGpaInput', this.addGpaInput);
    this.props.emitter.addListener('removeGpaInput', this.removeGpaInput);
    this.props.emitter.addListener('switchView', this.switchView);
  }

  render() {
    const { activeTab, gradeInputs, gpaInputs } = this.state;
    const { emitter } = this.props;

    return (
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
            as={Link}
            to="/"
          >

            <h3>Grade</h3>
          </Menu.Item>
          <Menu.Item
            name="GPA"
            active={ activeTab === 'GPA' }
            onClick={ this.onTabClick }
            as={Link}
            to="gpa"
          >
            <h3>GPA</h3>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path="/" render={
            routeProps => {
              return (
                <GradeView
                  activeTab={ activeTab } 
                  emitter={ emitter } 
                  title={`Calculate ${ activeTab }`}
                  gradeInputs={ gradeInputs } 
                  { ...routeProps }
                /> 
              );
            }
          } />
          <Route exact path="/gpa" render={
            routeProps => {
              return (
                <GPAView 
                  activeTab={ activeTab } 
                  emitter={ emitter } 
                  title={`Calculate ${ activeTab }`} 
                  gpaInputs={ gpaInputs }
                  { ...routeProps }
                />
              );
            }
          } />
          <Route render={
            () => <h1 className={css(styles.pageNotFound)}>Page not found.</h1>
          } />
        </Switch>
      </div>
    );
  }
}

export default NavMenu;
