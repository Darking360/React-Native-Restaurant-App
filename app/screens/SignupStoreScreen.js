/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


import { authRegister } from '../../src/actions/index';
import SignupComponent from '../components/Signup';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  handleSignUpSubmit = () => {
    const { email, password } = this.state;
    this.props.authRegister(email, password);
  };

  handleEmailChange = (email) => {
    this.setState({
      email,
    });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password,
    });
  };

  handleNameChange = (name) => {
    this.setState({
      name,
    });
  };

  handleDescriptionChange = (description) => {
    this.setState({
      description,
    });
  };

  render() {
    const { registerLoading, registerError, registerMessage } = this.props;
    const { email, password, name, description } = this.state;
    const disableSignUp = (!email || email.length === 0 || !password || password.length === 0 || !name || name.length === 0 || !description || description.length === 0);

    return (
      <SignupComponent
        type={'store'}
        loading={registerLoading}
        registerMessage={registerMessage}
        registerError={registerError}
        disableSignUp={disableSignUp}
        onSignupSubmit={this.handleSignUpSubmit}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        onNameChange={this.handleNameChange}
        onDescriptionChange={this.handleDescriptionChange}
      />);
  }
}

SignupScreen.defaultProps = {
  registerError: null,
  registerMessage: null,
  registerLoading: false,
};

SignupScreen.propTypes = {
  registerMessage: PropTypes.object,
  registerLoading: PropTypes.bool,
  registerError: PropTypes.object,
  authRegister: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
  return {
    registerMessage: state.auth.registerMessage,
    registerError: state.auth.registerError,
    registerLoading: state.auth.registerLoading,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    authRegister,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(SignupScreen);
