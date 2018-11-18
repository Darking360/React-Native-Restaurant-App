/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import BR from '../base_components/BR';
import TextInput from '../base_components/TextInput';
import RoundButton from '../base_components/RoundButton';
import TextButton from '../base_components/TextButton';
import { ScrollView } from 'react-native';
import debounce from 'lodash/debounce';

import { recoverPassword } from '../../src/actions/index';

class LoginScreen extends Component {
  displayName = 'LoginScreen';

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleEmailChange = (email) => {
    this.setState({
      email,
    });
  };

  handleRecoverPassword = () => {
    const { email } = this.state;
    const { recoverPassword } = this.props;
    recoverPassword({
      email,
      cb: () => {
        Actions.reset('loginScreen')
      }
    })
  }

  render() {
    const { loadingRecover } = this.props;

    const { email } = this.state;

    const disabled = (!email || email.length === 0);

    return (
      <ScrollView
        contentContainerLayout={{
          justifyContent: 'flex-start',
        }}
      >
        <BR size={20} />
        <PrimaryText bold size={26}>{'Recuperar Contrasena'}</PrimaryText>
        <BR size={20} />

        <TextInput
          autoCorrect={false}
          onChangeText={this.handleEmailChange}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          underlineColorAndroid="#B9B9B9"
          value={email}
          placeholder="Email a Recuperar"
        />
        <BR />
        <RoundButton
          title="Restablecer"
          disabled={disabled}
          loading={loadingRecover}
          onPress={this.handleRecoverPassword}
        />
        { /* TODO AGREGAR DIRECCIONES SI ES USUARIO ACA */ }
      </ScrollView>
    );
  }
}

LoginScreen.defaultProps = {
  loginError: null,
  loginMessage: null,
};

LoginScreen.propTypes = {
  loginLoading: PropTypes.bool.isRequired,
  loginError: PropTypes.object,
  loginMessage: PropTypes.object,
  authLogin: PropTypes.func.isRequired,
};

function initMapStateToProps(state) {
  return {
    info: state.auth.loginMessage,
    loadingRecover: state.auth.loadingRecover,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    recoverPassword,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(LoginScreen);
