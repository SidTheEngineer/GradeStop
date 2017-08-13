import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import { fadeIn } from 'react-animations';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
  modal: {
    animationName: fadeIn,
    animationDuration: '0.3s'
  },
  text: {
    textAlign: 'center',
    fontSize: '32',
    '@media (min-width: 768px)': { fontSize: '40pt' }
  }
});

const MessageModal = props => (
  <Modal
    className={css(styles.modal)} 
    basic 
    open={ props.open } 
    onClose={ props.onClose }
  >
    <Modal.Content onClick={ props.onClose }>
      <h1 className={css(styles.text)}>{ props.message }</h1>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={ props.onClose } size="large" color={ COLORS.PRIMARY } inverted>
        OK
      </Button>
    </Modal.Actions>
  </Modal>
);

export default MessageModal;