import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import {
  Segment,
  Container,
  Header
} from 'semantic-ui-react';
import COLORS from '../constants/colors';
import GradeInput from './GradeInput';
import Controls from './Controls';

class InputView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entryFields: [Date.now()]
    };

    this.addEntryField = this.addEntryField.bind(this);
    this.removeEntryField = this.removeEntryField.bind(this);
  }

  addEntryField() {
    this.setState({ entryFields: this.state.entryFields.concat([Date.now()]) });
  }

  removeEntryField() {
    this.setState({ entryFields: this.state.entryFields.slice(0, -1) });
  }

  componentWillMount() {
    this.props.emitter.addListener('addEntryField', this.addEntryField);
    this.props.emitter.addListener('removeEntryField', this.removeEntryField);
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
            { this.props.children }
          </Header>
        {this.state.entryFields.map(d => <GradeInput key={d} />)}
        </Segment>
        <Controls emitter={this.props.emitter} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '80px',
    width: '80%',
    minHeight: '100%',
    paddingBottom: '80px'
  },
  header: {
    color: 'white',
    textAlign: 'center'
  },
  segment: {
    backgroundColor: COLORS.GRAY_2,
    margin: '0'
  }
});

export default InputView;