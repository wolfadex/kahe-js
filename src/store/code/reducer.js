import { parse } from 'acorn';
import { CHANGE_CODE, CREATE_VARIABLE } from './types';

const initialState = {
  code: '',
  testAst: parse(''),
  ast: {
    type: 'Program',
    start: 0,
    body: [],
    sourceType: 'script',
  },
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case CHANGE_CODE: {
      let newAst = state.testAst;

      try {
        newAst = parse(payload.code);
      } catch (e) {
        // TODO
      }

      return {
        ...state,
        code: payload.code,
        testAst: newAst,
      };
    }
    case CREATE_VARIABLE:
      return {
        ...state,
        ast: {
          ...state.ast,
          body: [
            ...state.ast.body,
            {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: payload.name,
                  },
                  init: {
                    type: 'Literal', // TODO: double check, I think this can be other things
                    value: payload.value,
                    raw: `${payload.value}`,
                  },
                },
              ],
            },
          ],
        },
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