import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createVariable } from '../../store/code/actions';
import Modal from '../Modal';

const mapDispatchToProps = {
  createVariable,
};

@connect(null, mapDispatchToProps)
export default class VariableModal extends Component {
  state = {
    name: '',
    varType: 'string',
    value: '',
  }

  render() {
    const {
      handleClose,
    } = this.props;
    const {
      name,
      varType,
      value,
    } = this.state;

    return (
      <Modal>
        <div>
          New Variable
        </div>
        <label>
          <b>Name: </b>
          <input type="string" value={name} onChange={this.handleNameChange} required />
        </label>
        <label>
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
        </label>
        <label>
          <b>Value: </b>
          {
            varType === 'string' &&
            <input type="string" value={value} onChange={this.handleValueChange} />
          }
          {
            varType === 'number' &&
            <input type="number" value={value} onChange={this.handleValueChange} />
          }
          {
            varType === 'boolean' &&
            <input type="checkbox" checked={value} onChange={this.handleValueChange} />
          }
        </label>
        <button onClick={handleClose} type="button">
          Cancel
        </button>
        <button onClick={this.handleCreate} type="button" disabled={name.length === 0}>
          Create
        </button>
      </Modal>
    );
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleTypeChange = ({ target: { value } }) => {
    this.setState(({ value: oldValue }) => {
      let newValue;

      switch (value) {
        case 'string':
          newValue = `${oldValue}`;
          break;
        case 'number': {
          newValue = Number(oldValue);

          if (isNaN(newValue)) {
            newValue = 0;
          }

          break;
        }
        case 'boolean':
          newValue = !!oldValue;
          break;
      }

      return {
        varType: value,
        value: newValue,
      };
    });
  }

  handleValueChange = ({ target: { value, checked } }) => {
    this.setState(({ varType }) => ({
      value: varType === 'boolean' ? checked : value,
    }));
  }

  handleCreate = () => {
    const {
      name,
      varType,
      value,
    } = this.state;

    this.props.createVariable(name, varType, value);
    this.props.handleClose();
  }
}