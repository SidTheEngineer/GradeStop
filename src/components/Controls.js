import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  controlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '50px',
    position: 'fixed',
    bottom: '0px',
    left: '0px'
  },

  button: {
    margin: '0',
    borderRadius: '0'
  }
});

class Controls extends Component {
  render() {
    return (
      <div className={css(styles.controlsContainer)}>
        <Button icon="minus" size="huge" className={css(styles.button)} fluid color="red" />
        <Button icon="checkmark" size="huge" className={css(styles.button)} fluid color="teal" />
        <Button icon="plus" size="huge" className={css(styles.button)} fluid color="green" />
      </div>
    );
  }
}

export default Controls;