import React from 'react';
import { Input, Label } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import InputContainer from './InputContainer';
import { COLORS, PLACEHOLDERS } from '../constants';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    border: `3px ${COLORS.GRAY_2} solid`,
    borderRadius: '0px'
  }
});

const GradeInput = () => (
  <InputContainer>
    <Input
      className={css(styles.input)}
      placeholder={ PLACEHOLDERS.gradeInput }
      size="small"
      type="number"
      fluid
    >
      <input />
      <Label color="black" size="mini" attached="top right">%</Label>
    </Input>
    <Input
      className={css(styles.input)}
      placeholder={ PLACEHOLDERS.weightInput }
      size="small"
      type="number"
      fluid
    >
      <input />
      <Label color="black" size="mini" attached="top right">%</Label>
    </Input>
  </InputContainer>
);

export default GradeInput;