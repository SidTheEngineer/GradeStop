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

    this.emitAddInput = this.emitAddInput.bind(this);
    this.emitRemoveInput = this.emitRemoveInput.bind(this);
    this.emitSubmitInputs = this.emitSubmitInputs.bind(this);
  }

  emitAddInput() {
    switch (this.props.activeTab) {
      case 'Grade':
        this.props.emitter.emit('addGradeInput');
        break;
      default:
        this.props.emitter.emit('addGpaInput');
    }
    window.scrollTo(0, document.body.scrollHeight);
  }

  emitRemoveInput() {
    switch (this.props.activeTab) {
      case 'Grade':
        this.props.emitter.emit('removeGradeInput');
        break;
      default:
        this.props.emitter.emit('removeGpaInput');
    }
  }

  emitSubmitInputs() {
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
          onClick={ this.emitRemoveInput }
        />
        <Button
          icon="checkmark"
          size="huge"
          className={css(styles.button)} 
          fluid 
          color={COLORS.PRIMARY}
          onClick={ this.emitSubmitInputs }
        />
        <Button 
          icon="plus" 
          size="huge" 
          className={css(styles.button)} 
          fluid 
          color="black"
          onClick={ this.emitAddInput }
        />
      </div>
    );
  }
}

export default Controls;