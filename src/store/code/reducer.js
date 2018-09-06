import { parse } from 'acorn';
import { CHANGE_CODE } from './types';

const initialState = {
  code: '',
  ast: parse(''),
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case CHANGE_CODE: {
      let newAst = state.ast;

      try {
        newAst = parse(payload.code);
      } catch (e) {
        // TODO
      }

      return {
        ...state,
        code: payload.code,
        ast: newAst,
      };
    }
    default:
      return state;
  }
}


// NOTE: Examples
// // Variable
// const hello = 'Hello';
// // Function
// const sayHello = (name) => `${hello} ${name}`;
// // Calling a function
// sayHello('Carl');

// const hello = 'Hello';

// const sayHello = (name) => `${hello} ${name}`;

// function sayGoodbye(name) {
//   return "Goodbye " + name;
// }

// sayHello('Carl');