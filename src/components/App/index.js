import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import TextCode from '../TextCode';

const Container = styled('div')`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
`;

const styleGraphInput = css`
  flex: 1;
`;

export default class App extends Component {
  render() {
    return (
      <Container>
        <TextCode />
        <div className={styleGraphInput}>
          Graph
        </div>
      </Container>
    );
  }
}