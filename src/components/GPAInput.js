import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import InputContainer from './InputContainer';
import GRADE_OPTIONS from '../constants/grades';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    border: `3px ${COLORS.GRAY_2} solid`,
    borderRadius: '0px'
  }
});

const GPAInput = () => (
  <InputContainer>
    <Dropdown
      className={ css(styles.input) }
      placeholder="Grade"
      fluid 
      selection 
      options={ GRADE_OPTIONS }
    />
    <Input
      className={css(styles.input)}
      placeholder="Credits"
      size="small"
      type="number"
      fluid
    >
      <input />
    </Input>
  </InputContainer>
);

export default GPAInput;