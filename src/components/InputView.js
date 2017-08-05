import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {
  Segment,
  Container,
  Header
} from 'semantic-ui-react';
import COLORS from '../constants/colors';
import GradeInput from './GradeInput';
import Controls from './Controls';

const InputView = props => {
  return (
    <Container className={css(styles.container)}>
        <Segment
          className={css(styles.segment)}
          raised
          size="big"
        >
          <Header as="h1" className={css(styles.header)}>
            { props.children }
          </Header>
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
          <GradeInput />
        </Segment>
        <Controls />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '80px',
    width: '80%',
    minHeight: '100%',
    paddingBottom: '80px'
  },
  header: {
    color: COLORS.GRAY_7,
    textAlign: 'center'
  },
  segment: {
    backgroundColor: COLORS.GRAY_2,
    margin: '0'
  }
});

export default InputView;