import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styled from 'react-emotion';

const Background = styled('div')`
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const Container = styled('div')`
  background-color: white;
  margin-top: 5rem;
`;

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.modalEl = document.getElementById('modal-root');

    if (this.modelEl == null) {
      this.modalEl = document.createElement('div');
      this.modalEl.setAttribute('id', 'modal-root');
    }
  }

  componentDidMount() {
    document.body.appendChild(this.modalEl);
  }

  render() {
    const {
      children,
    } = this.props;

    return createPortal(
      <Background>
        <Container>
          {children}
        </Container>
      </Background>,
      this.modalEl,
    );
  }
}