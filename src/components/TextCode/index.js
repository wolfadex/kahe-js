import React, { Component } from 'react';
import { css } from 'react-emotion';
import { connect } from 'react-redux';
import { changeCode } from '../../store/code/actions';

const styleTextInput = css`
  resize: none;
  width: 20rem;
`;

const mapStateToProps = ({ code: { code } }) => ({
  code,
});

const mapDispatchToProps = {
  changeCode,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TextCode extends Component {
  render() {
    const {
      code,
    } = this.props;

    return (
      <textarea className={styleTextInput} value={code} onChange={this.handleChange} />
    );
  }

  handleChange = (e) => {
    this.props.changeCode(e.target.value);
  }
}