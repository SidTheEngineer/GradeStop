import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  input: {
   color: 'rgb(75, 75, 75)'
  }
});

class GradeInput extends Component {
  render() {
    return (
      <Input
        className={css(styles.input)}
        label={{ basic: 'true', content: '%' }}
        labelPosition="left"
        laceholder="Enter Grade ..."
        size="medium"
        fluid
      />
    );
  }
}

export default GradeInput;