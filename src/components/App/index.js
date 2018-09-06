import React, { Component } from 'react';
import styled from 'react-emotion';
import TextCode from '../TextCode';
import GraphCode from '../GraphCode';

const Container = styled('div')`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
`;

export default class App extends Component {
  render() {
    return (
      <Container>
        <TextCode />
        <GraphCode />
      </Container>
    );
  }
}