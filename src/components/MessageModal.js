import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { COLORS } from '../constants';

const MessageModal = props => (
  <Modal basic open={ props.open } onClose={ props.onClose }>
    <Modal.Content>
      <h1>{ props.message }</h1>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={ props.onClose } color={ COLORS.PRIMARY } inverted>
        OK
      </Button>
    </Modal.Actions>
  </Modal>
);

export default MessageModal;