import { parse } from 'acorn';
import {
  CHANGE_CODE,
  VARIABLE_CREATE,
  VARIABLE_CHANGE_NAME,
  VARIABLE_CHANGE_TYPE,
  VARIABLE_CHANGE_VALUE,
  SELECT_VARIABLE,
} from './types';

const initialState = {
  code: '',
  testAst: parse(''),
  ast: {
    type: 'Program',
    start: 0,
    body: [],
    sourceType: 'script',
  },
  selectedVariable: null,
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
    case VARIABLE_CREATE:
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
                    name: 'newVariable',
                  },
                  init: {
                    type: 'Literal', // TODO: double check, I think this can be other things
                    value: '',
                    raw: "''",
                  },
                },
              ],
            },
          ],
        },
      };
    case VARIABLE_CHANGE_NAME:
      return {
        ...state,
        selectedVariable: payload.newName,
        ast: {
          ...state.ast,
          body: state.ast.body.map((token) => {
            if (token.type === 'VariableDeclaration' && token.declarations[0].type === 'VariableDeclarator' && token.declarations[0].id.name === payload.name) {
              return {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: {
                      type: 'Identifier',
                      name: payload.newName,
                    },
                    init: {
                      type: 'Literal', // TODO: double check, I think this can be other things
                      value: token.declarations[0].init.value,
                      raw: token.declarations[0].init.raw,
                    },
                  },
                ],
              };
            }

            return token;
          }),
        },
      };
    case VARIABLE_CHANGE_VALUE:
      return {
        ...state,
        ast: {
          ...state.ast,
          body: state.ast.body.map((token) => {
            if (token.type === 'VariableDeclaration' && token.declarations[0].type === 'VariableDeclarator' && token.declarations[0].id.name === payload.name) {
              return {
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
              };
            }

            return token;
          }),
        },
      };
    case SELECT_VARIABLE:
      return {
        ...state,
        selectedVariable: payload.name,
      };
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