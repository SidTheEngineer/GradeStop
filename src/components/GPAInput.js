import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import InputContainer from './InputContainer';
import { COLORS, PLACEHOLDERS, GRADE_OPTIONS } from '../constants';

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
      placeholder={ PLACEHOLDERS.gpaGradeInput }
      fluid 
      selection
      icon="caret down"
      options={ GRADE_OPTIONS }
    />
    <Input
      className={css(styles.input)}
      placeholder={ PLACEHOLDERS.gpaCreditInput }
      size="small"
      type="number"
      fluid
    >
      <input />
    </Input>
  </InputContainer>
);

export default GPAInput;