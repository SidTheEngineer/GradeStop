import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';
import { COLORS, PLACEHOLDERS, TAB_NAMES, MESSAGES, GPA_GRADE_WEIGHTS } from '../constants';
import GradeView from '../components/GradeView';
import GradeInput from '../components/GradeInput';
import GPAView from '../components/GPAView';
import GPAInput from '../components/GPAInput';
import NavMenu from '../components/NavMenu';
import MessageModal from '../components/MessageModal';

// TODO: Start working on a way to collect all of the data within the inputs
// to calculate grade/GPA (on the backend?)

// TODO: Try and find a way to preserve input state (this may come with setting
// up RR4).

const styles = StyleSheet.create({
  appContainer: {
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

class GradeStop extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: TAB_NAMES.grade,
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
    const gradeInputs = this.fetchInputs();
    if (this.hasEmptyInputs(gradeInputs))
      this.setState({ errorModal: true });
    else {
      console.log(gradeInputs);
    }
  }

  submitGpaInputs() {
    const gpaDropdowns = this.fetchDropdowns();
    const gpaInputs = this.fetchInputs();
    if (this.hasEmptyDropdowns(gpaDropdowns) || this.hasEmptyInputs(gpaInputs))
      this.setState({ errorModal: true });
    else {
      const gpa = this.calculateGpa(gpaDropdowns, gpaInputs);
      console.log(gpa);
    }
  }

  hasEmptyInputs(inputs) {
    for (let i of inputs) {
      if (i.value.length === 0) {
        return true;
      }
    }
    return false;
  }

  hasEmptyDropdowns(dropdowns) {
    for (let d of dropdowns) {
      if (d.textContent === PLACEHOLDERS.gpaGradeInput)
        return true;
    }
    return false;
  }

  fetchInputs() {
    return Array.from(document.getElementsByTagName('input'));
  }

  fetchDropdowns() {
    return Array.from(document.querySelectorAll('div.text'));
  }

  calculateGpa(dropdowns, inputs) {
    let totalGradePoints = 0;
    let totalCredits = 0;

    while (dropdowns.length !== 0 && inputs.length !== 0) {
      const grade = dropdowns.shift().textContent;
      const credits = parseInt(inputs.shift().value, 10);

      totalGradePoints += GPA_GRADE_WEIGHTS[grade] * credits;
      totalCredits += credits;
    }
    return (totalGradePoints / totalCredits).toPrecision(3);
  }

  onTabClick(e, { name }) {
    this.setState({ activeTab: name });
  }

  switchView(pathName) {
    if (pathName === '/')
      this.setState({ activeTab: TAB_NAMES.grade });
    else 
      this.setState({ activeTab: TAB_NAMES.gpa });
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
      <div className={css(styles.appContainer)}>
        <MessageModal
          open={ this.state.errorModal }
          onClose={ this.closeErrorModal }
          message={ MESSAGES.emptyInputError }
        />
        <NavMenu
          onTabClick={ this.onTabClick }
          activeTab={ activeTab }
        />
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

export default GradeStop;
