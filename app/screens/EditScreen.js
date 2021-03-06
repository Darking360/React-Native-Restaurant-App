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


import { updateUser } from '../../src/actions/index';
import LoginComponent from '../components/Login';

class LoginScreen extends Component {
  displayName = 'LoginScreen';

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      description: '',
      address: '',
    };
  }

  componentDidMount() {
    const { info: { user: { email, name, description, address } } } = this.props;
    this.setState({ email, name, description, address });
  }

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

  handleAddressChange = (address) => {
    this.setState({
      address,
    });
  };

  handleUpdateProfile = () => {
    const { name, description, email, password, address } = this.state;
    const { updateUser } = this.props;
    updateUser({ name, description, email, password, address });
  }

  render() {
    const { info: { role: type }, loadingUpdate } = this.props;

    let { loginError } = this.props;

    const { email, password, name, description, address } = this.state;

    const disabled = ((type === 'user' && (!email || email.length === 0)) || (type === 'store' && (!description || description.length === 0 || !name || name.length === 0)));

    return (
      <ScrollView
        contentContainerLayout={{
          justifyContent: 'flex-start',
        }}
      >
        <BR size={20} />
        <PrimaryText bold size={26}>{type === 'user' ? 'Editar Persona' : 'Editar Tienda'}</PrimaryText>
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
          placeholder="Email"
        />
        <BR />
        <TextInput
          autoCorrect={false}
          onChangeText={this.handlePasswordChange}
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
                onChangeText={this.handleAddressChange}
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
          type === 'restaurant' && (
            <React.Fragment>
              <TextInput
                autoCorrect={false}
                onChangeText={this.handleNameChange}
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
                onChangeText={this.handleDescriptionChange}
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
          title="Actualizar"
          disabled={disabled}
          loading={loadingUpdate}
          onPress={this.handleUpdateProfile}
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
    loadingUpdate: state.auth.loadingUpdate,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(LoginScreen);
