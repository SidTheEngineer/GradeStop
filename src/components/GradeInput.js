import React from 'react';
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

const GradeInput = () => (
  <InputContainer>
    <Input
      className={css(styles.input)}
      placeholder="Grade"
      size="small"
      type="number"
      fluid
    >
      <input />
      <Label color="black" size="mini" attached="top right">%</Label>
    </Input>
    <Input
      className={css(styles.input)}
      placeholder="Weight"
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