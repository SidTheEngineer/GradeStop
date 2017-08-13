import React from 'react';
import { Modal } from 'semantic-ui-react';
import { StyleSheet, css } from 'aphrodite';
import { fadeIn } from 'react-animations';

const styles = StyleSheet.create({
  modal: {
    animationName: fadeIn,
    animationDuration: '0.3s'
  },
  title: { textAlign: 'center', fontSize: '32pt' },
  text: { textAlign: 'center', fontSize: '48pt' }
});

const ResultModal = props => (
  <Modal
    className={css(styles.modal)}
    basic
    open={ props.open }
    onClose={ props.onClose }
    size="small"
  >
    <Modal.Content onClick={ props.onClose }>
      <h2 className={css(styles.title)}>Your {
        props.gpaResultShowing
        ? 'GPA'
        : 'Grade'
      }
      </h2>
      <h1 className={css(styles.text)}>
        {
          props.gpaResultShowing
          ? props.gpa
          : props.grade + '%'
        }
      </h1>
    </Modal.Content>
  </Modal>
);

export default ResultModal;