import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import { fadeIn } from 'react-animations';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
  modal: {
    animationName: fadeIn,
    animationDuration: '0.3s'
  }
});

const MessageModal = props => (
  <Modal className={css(styles.modal)} basic open={ props.open } onClose={ props.onClose }>
    <Modal.Content>
      <h1>{ props.message }</h1>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={ props.onClose } size="medium" color={ COLORS.PRIMARY } inverted>
        OK
      </Button>
    </Modal.Actions>
  </Modal>
);

export default MessageModal;