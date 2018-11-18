/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native';


import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import BR from '../base_components/BR';
import TextInput from '../base_components/TextInput';
import RoundButton from '../base_components/RoundButton';
import TextButton from '../base_components/TextButton';

class SignupComponent extends Component {
  render() {
    const {
      loading, onSignupSubmit,
      onEmailChange, onPasswordChange,
      onNameChange, onDescriptionChange,
      onAddressChange,
      registerError, disableSignUp,
      registerMessage, type,
      email, password, name, description, address,
    } = this.props;

    if (registerMessage && registerMessage.success) {
      Actions.replace('loginScreen', {
        loginError: {
          message: 'Sign Up successful',
        },
      });
    }

    return (
      <ScrollView
        contentContainerLayout={{
          justifyContent: 'flex-start',
        }}
      >
        <PrimaryText bold size={26}>{type === 'user' ? 'Persona' : 'Tienda'}</PrimaryText>
        <BR size={50} />

        <TextInput
          autoCorrect={false}
          onChangeText={onEmailChange}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          underlineColorAndroid="#B9B9B9"
          value={email}
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
          underlineColorAndroid="#B9B9B9"
          secureTextEntry
          value={password}
          placeholder="Password"
        />
        <BR />
        {
          type === 'user' && (
            <React.Fragment>
              <TextInput
                autoCorrect={false}
                onChangeText={onAddressChange}
                style={{
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                underlineColorAndroid="#B9B9B9"
                value={address}
                placeholder="Direccion"
              />
              <BR />
            </React.Fragment>
          )
        }
        {
          type === 'store' && (
            <React.Fragment>
              <TextInput
                autoCorrect={false}
                onChangeText={onNameChange}
                style={{
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                value={name}
                underlineColorAndroid="#B9B9B9"
                placeholder="Nombre de la Tienda"
              />
              <BR />
              <TextInput
                autoCorrect={false}
                onChangeText={onDescriptionChange}
                style={{
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                underlineColorAndroid="#B9B9B9"
                multiline
                value={description}
                placeholder="Descripcion"
              />
              <BR />
            </React.Fragment>
          )
        }
        <RoundButton
          title="Registrar"
          disabled={disableSignUp}
          loading={loading}
          onPress={onSignupSubmit}
        />
      </ScrollView>
    );
  }
}

SignupComponent.defaultProps = {
  registerMessage: null,
  registerError: null,
};

SignupComponent.propTypes = {
  disableSignUp: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  registerMessage: PropTypes.object,
  registerError: PropTypes.object,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSignupSubmit: PropTypes.func.isRequired,
};

export default SignupComponent;
