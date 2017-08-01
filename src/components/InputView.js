import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { flip } from 'react-animations';
import {
  Menu,
  Segment,
  Container
} from 'semantic-ui-react';

const InputView = props => {
  return (
    <Container className={css(styles.container)}>
      <Segment
        className={css(styles.segment, styles.flip)}
        raised
        size={"big"}
      >
        {
          props.tab === 'Grade'
            ? "This is the Grade tab"
            : "This is the GPA tab"
        }
      </Segment>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '50px'
  },
  segment: {
    height: '500px',
  },

  flip: {
    animationName: flip,
    animationDuration: '5s'
  }
});

export default InputView;