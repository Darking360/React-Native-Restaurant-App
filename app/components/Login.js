/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Actions } from 'react-native-router-flux';


import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import BR from '../base_components/BR';
import TextInput from '../base_components/TextInput';
import RoundButton from '../base_components/RoundButton';
import TextButton from '../base_components/TextButton';
import Colors from '../../src/constants/colors';

class LoginComponent extends Component {
  render() {
    const {
      loading, onLoginSubmit, onEmailChange, onPasswordChange, loginError, disableLogin,
    } = this.props;

    return (
      <AppBase
        style={{
          justifyContent: 'center',
        }}
      >
        <PrimaryText bold size={26}>Order my Food</PrimaryText>
        <BR size={50} />
        {loginError && <PrimaryText>{loginError.message}</PrimaryText>}
        <BR size={50} />

        <TextInput
          autoCorrect={false}
          onChangeText={onEmailChange}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          defaultValue="Test@gmail.com"
          underlineColorAndroid="#B9B9B9"
          placeholder="Email"
        />
        <BR />
        <TextInput
          autoCorrect={false}
          onChangeText={onPasswordChange}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          defaultValue="test123"
          underlineColorAndroid="#B9B9B9"
          secureTextEntry
          placeholder="Password"
        />
        <BR />
        <TextButton
          onPress={() => Actions.forgotPassword()}
          title="Olvidaste tu contrasenia?"
        />
        <BR />
        <RoundButton
          title="Iniciar sesion"
          disabled={disableLogin}
          loading={loading}
          onPress={onLoginSubmit}
        />
        <BR size={10} />
        <RoundButton
          primary
          buttonColor={Colors.blue}
          title="Registro Usuario"
          onPress={() => Actions.signupScreen()}
        />
        <RoundButton
          primary
          buttonColor={Colors.green}
          title="Registro Tienda"
          onPress={() => Actions.signupStoreScreen()}
        />
        <BR size={20} />
      </AppBase>
    );
  }
}

LoginComponent.defaultProps = {
  loginError: null,
};

LoginComponent.propTypes = {
  disableLogin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loginError: PropTypes.object,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
};

export default LoginComponent;
