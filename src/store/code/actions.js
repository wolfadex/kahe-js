import { CHANGE_CODE, CREATE_VARIABLE } from './types';

export const changeCode = (code) => ({
  code,
  type: CHANGE_CODE,
});

export const createVariable = (name, varType, value) => ({
  name,
  value,
  varType,
  type: CREATE_VARIABLE,
})