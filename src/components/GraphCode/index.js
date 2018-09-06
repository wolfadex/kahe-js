import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { connect } from 'react-redux';
import { generate } from 'astring';
import { createVariable, selectVariable } from '../../store/code/actions';
import PropertiesPanel from '../PropertiesPanel';

const Container = styled('div')`
  display: flex;
  flex: 1;
`;

const Variables = styled('div')`
  display: flex;
  flex-direction: column;
  width: 10rem;
`;

const Graph = styled('div')`
  flex: 1;
`;

const mapStateToProps = ({ code: { ast, testAst } }) => ({
  ast,
  testAst,
});

const mapDispatchToProps = {
  createVariable,
  selectVariable,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class GraphCode extends Component {
  state = {
    selectedVariable: null,
  }

  render() {
    const {
      ast,
    } = this.props;
    const {
      selectedVariable,
    } = this.state;

    return (
      <Container>
        <Variables>
          <button onClick={this.handleLogging}>
            Log AST and JS
          </button>
          <b>
            Variables
          </b>
          {ast.body.map((token) => {
            if (token.type === 'VariableDeclaration') {
              if (token.declarations[0].type === 'VariableDeclarator') {
                return (
                  <div
                    onClick={this.handleVariableClick(token.declarations[0].id.name)}
                    className={css`
                      background-color: ${(() => {
                        switch (typeof token.declarations[0].init.value) {
                          case 'string':
                            return 'rgb(0, 255, 0)';
                          case 'number':
                            return 'rgb(255, 0, 0)';
                          case 'boolean':
                            return 'rgb(0, 0, 255)';
                        }
                      })()};
                      color: white;
                      text-align: center;
                    `}
                  >
                    {token.declarations[0].id.name}
                  </div>
                );
              }
            }

            return null;
          })}
          <button onClick={this.handleNewVariable}>
            New Variable
          </button>
        </Variables>
        <Graph>
          Graph
        </Graph>
        <PropertiesPanel />
      </Container>
    );
  }

  handleVariableClick = (name) => () => {
    this.props.selectVariable(name);
  }

  handleNewVariable = () => {
    this.props.createVariable();
  }

  handleLogging = () => {
    const {
      ast,
    } = this.props;

    console.log('AST: ', ast);
    console.log('JS: ', generate(ast));
  }
}