import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import {
  Segment,
  Container,
  Header
} from 'semantic-ui-react';
import { pulse } from 'react-animations';
import { COLORS } from '../constants';
import Controls from './Controls';

const styles = StyleSheet.create({
  container: {
    paddingTop: '80px',
    width: '80%',
    minHeight: '100%',
    paddingBottom: '80px',
  },
  header: {
    color: 'white',
    textAlign: 'center'
  },
  segment: {
    backgroundColor: COLORS.GRAY_2,
    margin: '0',
    animationName: pulse,
    animationDuration: '0.35s'
  }
});

class GradeView extends Component {
  componentWillUnmount() {
    this.props.emitter.emit('switchView', this.props.history.location.pathname);
  }

  render() {
    return (
      <Container className={css(styles.container)}>
        <Segment
          className={css(styles.segment)}
          raised
          size="big"
        >
          <Header as="h1" className={css(styles.header)}>
            { this.props.title }
          </Header>
        { this.props.gradeInputs.map(i => i) }
        </Segment>
        <Controls activeTab={ this.props.activeTab } emitter={ this.props.emitter } />
      </Container>
    );
  }
}

export default GradeView;