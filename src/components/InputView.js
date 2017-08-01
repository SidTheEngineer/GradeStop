import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {
  Segment,
  Container,
  Header
} from 'semantic-ui-react';

const InputView = props => {
  return (
    <Container className={css(styles.container)}>
        <Segment
          className={css(styles.segment)}
          raised
          size={"big"}
        >
          <Header as="h1" className={css(styles.header)}>
            { props.children }
          </Header>
        </Segment>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '50px',
    width: '850px'
  },
  segment: {
    height: '500px',
  },
  header: {
    color: 'purple'
  }
});

export default InputView;