import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { generate } from 'astring';
import VariableModal from '../VariableModal';

const Container = styled('div')`
  flex: 1;
`;

const mapStateToProps = ({ code: { ast, testAst } }) => ({
  ast,
  testAst,
});

@connect(mapStateToProps)
export default class GraphCode extends Component {
  state = {
    showNewVariableModal: false,
  }

  render() {
    const {
      ast,
    } = this.props;
    const {
      showNewVariableModal,
    } = this.state;

    return (
      <Container>
        {
          showNewVariableModal &&
          <VariableModal handleClose={this.handleVariableModalClose} />
        }
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
                <div>
                  {token.declarations[0].id.name}:
                  {token.declarations[0].init.value},
                  {typeof token.declarations[0].init.value}
                </div>
              );
            }
          }

          return null;
        })}
        <button onClick={this.handleNewVariable}>
          New Variable
        </button>
      </Container>
    );
  }

  handleNewVariable = () => {
    this.setState({
      showNewVariableModal: true,
    });
  }

  handleVariableModalClose = () => {
    this.setState({
      showNewVariableModal: false,
    });
  }

  handleLogging = () => {
    const {
      ast,
    } = this.props;

    console.log('AST: ', ast);
    console.log('JS: ', generate(ast));
  }
}