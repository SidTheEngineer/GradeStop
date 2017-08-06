import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { slideInUp } from 'react-animations';

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    animationName: slideInUp,
    animationDuration: '0.35s'
  }
});

const InputContainer = props => (
  <div className={ css(styles.inputContainer) }>
    { props.children }
  </div>
);

export default InputContainer;