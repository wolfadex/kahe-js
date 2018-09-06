import { CHANGE_CODE } from './types';

export const changeCode = (code) => ({
  code,
  type: CHANGE_CODE,
});