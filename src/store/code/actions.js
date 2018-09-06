import {
  CHANGE_CODE,
  VARIABLE_CREATE,
  VARIABLE_CHANGE_NAME,
  VARIABLE_CHANGE_TYPE,
  VARIABLE_CHANGE_VALUE,
  SELECT_VARIABLE,
} from './types';

export const changeCode = (code) => ({
  code,
  type: CHANGE_CODE,
});

export const createVariable = () => ({
  type: VARIABLE_CREATE,
})

export const variableChangeName = (name, newName) => ({
  name,
  newName,
  type: VARIABLE_CHANGE_NAME,
});

export const variableChangeType = (name, varType) => ({
  name,
  varType,
  type: VARIABLE_CHANGE_TYPE,
});

export const variableChangeValue = (name, value) => ({
  name,
  value,
  type: VARIABLE_CHANGE_VALUE,
});

export const selectVariable = (name) => ({
  name,
  type: SELECT_VARIABLE,
})