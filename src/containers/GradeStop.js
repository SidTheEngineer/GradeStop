import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';
import GradeInputView from '../components/GradeInputView';
import GradeInput from '../components/GradeInput';
import GPAInputView from '../components/GPAInputView';
import GPAInput from '../components/GPAInput';
import NavMenu from '../components/NavMenu';
import MessageModal from '../components/MessageModal';
import ResultModal from '../components/ResultModal';
import {
  COLORS,
  PLACEHOLDERS,
  TAB_NAMES, 
  MESSAGES, 
  GPA_GRADE_WEIGHTS,
} from '../constants';

// TODO: Error checking/input restriction throughout app.

// TODO: Media queries for desktop view.

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
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.location.pathname === "/"
        ? TAB_NAMES.grade
        : TAB_NAMES.gpa,
      gradeInputs: [<GradeInput key={ _.uniqueId('key:') } />],
      gpaInputs: [<GPAInput key={ _.uniqueId('key:') } />],
      errorModal: false,
      gpaResultShowing: false,
      gradeResultShowing: false,
      gpa: null,
      grade: null
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
    this.closeResultModal = this.closeResultModal.bind(this);
    this.showGpaResult = this.showGpaResult.bind(this);
    this.showGradeResult = this.showGradeResult.bind(this);
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
      const grade = this.calculateGrade(gradeInputs);
      this.props.emitter.emit('showGradeResult', grade);
    }
  }

  submitGpaInputs() {
    const gpaDropdowns = this.fetchDropdowns();
    const gpaInputs = this.fetchInputs();
    if (this.hasEmptyDropdowns(gpaDropdowns) || this.hasEmptyInputs(gpaInputs))
      this.setState({ errorModal: true });
    else {
      const gpa = this.calculateGpa(gpaDropdowns, gpaInputs);
      this.props.emitter.emit('showGpaResult', gpa);
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

  showGpaResult(gpa) {
    this.setState({ gpa, gpaResultShowing: true });
  }

  showGradeResult(grade) {
    this.setState({ grade, gradeResultShowing: true });
  }

  calculateGpa(dropdowns, inputs) {
    let totalGradePoints = 0;
    let totalCredits = 0;

    while (dropdowns.length !== 0 && inputs.length !== 0) {
      const grade = dropdowns.shift().textContent;
      const credits = Number(inputs.shift().value);

      totalGradePoints += GPA_GRADE_WEIGHTS[grade] * credits;
      totalCredits += credits;
    }
    return (totalGradePoints / totalCredits).toPrecision(3);
  }

  calculateGrade(inputs) {
    let runningSum = 0;
    let weightSum = 0;

    while (inputs.length !== 0) {
      const grade = Number(inputs.shift().value);
      const weight = Number(inputs.shift().value);

      runningSum += (grade * weight);
      weightSum += weight;
    }

    return (runningSum / weightSum).toPrecision(3);
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

  closeResultModal() {
    this.setState({
      gpaResultShowing: false,
      gradeResultShowing: false
    });
  }

  componentWillMount() {
    this.props.emitter.addListener('addGradeInput', this.addGradeInput);
    this.props.emitter.addListener('removeGradeInput', this.removeGradeInput);
    this.props.emitter.addListener('addGpaInput', this.addGpaInput);
    this.props.emitter.addListener('removeGpaInput', this.removeGpaInput);
    this.props.emitter.addListener('submitGradeInputs', this.submitGradeInputs);
    this.props.emitter.addListener('submitGpaInputs', this.submitGpaInputs);
    this.props.emitter.addListener('switchView', this.switchView);
    this.props.emitter.addListener('showGpaResult', this.showGpaResult);
    this.props.emitter.addListener('showGradeResult', this.showGradeResult);
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
        <ResultModal
          open={ this.state.gpaResultShowing || this.state.gradeResultShowing }
          onClose={ this.closeResultModal }
          {...this.state}
        />
        <NavMenu
          onTabClick={ this.onTabClick }
          activeTab={ activeTab }
        />
        <Switch>
          <Route exact path="/" render={
            routeProps => {
              return (
                <GradeInputView
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
                <GPAInputView 
                  activeTab={ TAB_NAMES.gpa } 
                  emitter={ emitter } 
                  title={`Calculate ${ TAB_NAMES.gpa }`} 
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
