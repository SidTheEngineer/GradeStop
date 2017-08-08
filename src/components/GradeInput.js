import React, { Component } from 'react';
import { Input, Label } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import InputContainer from './InputContainer';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    border: `3px ${COLORS.GRAY_2} solid`,
    borderRadius: '0px'
  }
});

class GradeInput extends Component {
  constructor() {
    super();

    this.state = {
      currentGrade: "",
      currentWeight: ""
    }

    this.updateCurrentGrade = this.updateCurrentGrade.bind(this);
    this.updateCurrentWeight = this.updateCurrentWeight.bind(this);
  }

  updateCurrentGrade(e, data) {
    this.setState({ currentGrade: data.value });
  }

  updateCurrentWeight (e, data) {
    this.setState({ currentWeight: data.value });
  }

  render() {
    return (
      <InputContainer>
        <Input
          className={css(styles.input)}
          placeholder="Grade"
          size="small"
          type="number"
          fluid
          onChange={(e, data) => this.updateCurrentGrade(e, data)}
        >
          <input value={ this.state.currentGrade } />
          <Label color="black" size="mini" attached="top right">%</Label>
        </Input>
        <Input
          className={css(styles.input)}
          placeholder="Weight"
          size="small"
          type="number"
          fluid
          onChange={(e, data) => this.updateCurrentWeight(e, data)}
        >
          <input value={ this.state.currentWeight } />
          <Label color="black" size="mini" attached="top right">%</Label>
        </Input>
      </InputContainer>
    );
  }
}

export default GradeInput;