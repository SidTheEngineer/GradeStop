import React, { Component } from 'react';
import { Input, Label } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  input: {
    backgroundColor: COLORS.GRAY_2,
    width: '100%',
    borderBottom: `thin ${COLORS.GRAY_2} solid`,
    borderRadius: '0px'
  }
});

class GradeInput extends Component {
  render() {
    return (
      <div className={css(styles.inputContainer)}>
        <Input
          className={css(styles.input)}
          placeholder="Grade"
          size="small"
          fluid
        >
          <input />
          <Label color="black" size="mini" attached="top right">%</Label>
        </Input>
        <Input
          className={css(styles.input)}
          placeholder="Weight"
          size="small"
          fluid
        >
          <input />
          <Label color="black" size="mini" attached="top right">%</Label>
        </Input>
      </div>
    );
  }
}

export default GradeInput;