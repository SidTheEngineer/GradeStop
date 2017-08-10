import React, { Component } from 'react';
import { Menu, Modal, Button } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';
import COLORS from '../constants/colors';
import GradeView from '../components/GradeView';
import GradeInput from '../components/GradeInput';
import GPAView from '../components/GPAView';
import GPAInput from '../components/GPAInput';

// TODO: Start working on a way to collect all of the data within the inputs
// to calculate grade/GPA (on the backend?)

// TODO: Try and find a way to preserve input state (this may come with setting
// up RR4).

// TODO: Consider renaming this container and abstracting away the navbar
// away to its own component (might declutter this container).

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
      gpaInputs: [<GPAInput key={ _.uniqueId('key:') } />],
      errorModal: false
    };

    this.onTabClick = this.onTabClick.bind(this);
    this.addGradeInput = this.addGradeInput.bind(this);
    this.removeGradeInput = this.removeGradeInput.bind(this);
    this.addGpaInput = this.addGpaInput.bind(this);
    this.removeGpaInput = this.removeGpaInput.bind(this);
    this.submitGradeInputs = this.submitGradeInputs.bind(this);
    this.submitGpaInputs = this.submitGpaInputs.bind(this);
    this.switchView = this.switchView.bind(this);
    this.closeErrorModal = this.closeErrorModal.bind(this);
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

  submitGradeInputs() {
    if (this.hasEmptyInputs()) this.setState({ errorModal: true });
  }

  submitGpaInputs() {
    if (this.hasEmptyDropdowns()) console.log("EMPTY DROPDOWNS DETECTED");
  }

  hasEmptyInputs() {
    for (let i of document.getElementsByTagName('input')) {
      if (i.value.length === 0) {
        return true;
      }
    }
    return false;
  }

  hasEmptyDropdowns() {
    for (let d of document.querySelectorAll('div.default.text')) {
      if (d.textContent === 'Grade')
        return true;
    }
    return false;
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

  closeErrorModal() {
    this.setState({ errorModal: false });
  }

  componentWillMount() {
    this.props.emitter.addListener('addGradeInput', this.addGradeInput);
    this.props.emitter.addListener('removeGradeInput', this.removeGradeInput);
    this.props.emitter.addListener('addGpaInput', this.addGpaInput);
    this.props.emitter.addListener('removeGpaInput', this.removeGpaInput);
    this.props.emitter.addListener('submitGradeInputs', this.submitGradeInputs);
    this.props.emitter.addListener('submitGpaInputs', this.submitGpaInputs);
    this.props.emitter.addListener('switchView', this.switchView);
  }

  render() {
    const { activeTab, gradeInputs, gpaInputs } = this.state;
    const { emitter } = this.props;

    return (
      <div className={css(styles.navMenu)}>
        <Modal basic open={ this.state.errorModal } onClose={ this.closeErrorModal }>
          <Modal.Content>
            <h1>Make sure you've filled in all of the inputs!</h1>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={ this.closeErrorModal } color="purple" inverted>
              OK
            </Button>
          </Modal.Actions>
        </Modal>
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
          {/* PWA start URL in manifest.json */}
          <Route exact path="/index.html" render={() => {
            return <Redirect to="/" />
          }} />
          <Route render={
            () => <h1 className={css(styles.pageNotFound)}>Page not found.</h1>
          } />
        </Switch>
      </div>
    );
  }
}

export default NavMenu;
