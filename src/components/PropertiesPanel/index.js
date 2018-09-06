import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import {
  variableChangeName,
  variableChangeValue,
} from '../../store/code/actions';

const Properties = styled('div')`
  border-left: 1px solid black;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 20rem;
`;

const InputItem = styled('label')`
  margin: 0.5rem 0;
`;

const mapStateToProps = ({ code: { selectedVariable, ast } }) => ({
  token: ast.body.find((token) => token.declarations[0].id.name === selectedVariable),
});

const mapDispatchToProps = {
  variableChangeName,
  variableChangeValue,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PropertiesPanel extends Component {
  render() {
    const {
      token,
    } = this.props;
    const varType = token && typeof token.declarations[0].init.value || null;

    return (
      <Properties>
        Properties
        {
          token &&
          <InputItem>
            <b>Name: </b>
            <input type="string" value={token.declarations[0].id.name} onChange={this.handleNameChange} required />
          </InputItem>
        }
        {
          token &&
          <InputItem>
            <b>Type: </b>
            <select value={varType} onChange={this.handleTypeChange}>
              <option value="string">
                String
              </option>
              <option value="number">
                Number
              </option>
              <option value="boolean">
                Boolean
              </option>
            </select>
          </InputItem>
        }
        {
          token &&
          <InputItem>
            <b>Value: </b>
            {
              varType === 'string' &&
              <input type="string" value={token.declarations[0].init.value} onChange={this.handleValueChange} />
            }
            {
              varType === 'number' &&
              <input type="number" value={token.declarations[0].init.value} onChange={this.handleValueChange} />
            }
            {
              varType === 'boolean' &&
              <input type="checkbox" checked={token.declarations[0].init.value} onChange={this.handleValueChange} />
            }
          </InputItem>
        }
      </Properties>
    );
  }

  handleNameChange = (e) => {
    this.props.variableChangeName(this.props.token.declarations[0].id.name, e.target.value);
  }

  handleTypeChange = ({ target: { value } }) => {
    // this.setState(({ value: oldValue }) => {
    //   let newValue;

    //   switch (value) {
    //     case 'string':
    //       newValue = `${oldValue}`;
    //       break;
    //     case 'number': {
    //       newValue = Number(oldValue);

    //       if (isNaN(newValue)) {
    //         newValue = 0;
    //       }

    //       break;
    //     }
    //     case 'boolean':
    //       newValue = !!oldValue;
    //       break;
    //   }

    //   return {
    //     varType: value,
    //     value: newValue,
    //   };
    // });
  }

  handleValueChange = ({ target: { value, checked } }) => {
    this.props.variableChangeValue()
    // this.setState(({ varType }) => ({
    //   value: varType === 'boolean' ? checked : value,
    // }));
  }
}