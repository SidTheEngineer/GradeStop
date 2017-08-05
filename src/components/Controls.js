import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import COLORS from '../constants/colors';

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
  constructor(props) {
    super(props);

    this.emitAddEntryField = this.emitAddEntryField.bind(this);
    this.emitRemoveEntryField = this.emitRemoveEntryField.bind(this);
    this.emitSubmitEntryFields = this.emitSubmitEntryFields.bind(this);
  }

  emitAddEntryField() {
    this.props.emitter.emit('addEntryField');
    window.scrollTo(0, document.body.scrollHeight);
  }

  emitRemoveEntryField() {
    this.props.emitter.emit('removeEntryField');
  }


  emitSubmitEntryFields() {
    // TODO: Pub event
    console.log("Entry fields submitted");
  }

  render() {
    return (
      <div className={css(styles.controlsContainer)}>
        <Button
          icon="minus"
          size="huge" 
          className={css(styles.button)} 
          fluid 
          color="black"
          onClick={ this.emitRemoveEntryField }
        />
        <Button
          icon="checkmark"
          size="huge"
          className={css(styles.button)} 
          fluid 
          color={COLORS.PRIMARY}
          onClick={ this.emitSubmitEntryFields }
        />
        <Button 
          icon="plus" 
          size="huge" 
          className={css(styles.button)} 
          fluid 
          color="black"
          onClick={ this.emitAddEntryField }
        />
      </div>
    );
  }
}

export default Controls;