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
    };
  }

  componentDidMount() {
    const { info } = this.props;
    this.setState({ ...info });
  }

  async componentWillReceiveProps(nextProps, nextContext) {
    await this.handleRedirect(nextProps.loginMessage);
  }


  handleLoginSubmit = () => {
    const { email, password } = this.state;
    this.props.authLogin(email, password);
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

  handleUpdateProfile = () => {
    const { name, description, email, password } = this.state;
    const { updateUser } = this.props;
    updateUser({ name, description, email, password });
  }

  render() {
    const { info: { type, loadingUpdate } } = this.props;

    let { loginError } = this.props;

    const { email, password, name, description } = this.state;

    const disabled = (!email || email.length === 0 || !name || name.length === 0 || !description || description.length === 0 || loadingUpdate);

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
          onChangeText={debounce(this.handleEmailChange, 500)}
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
          onChangeText={debounce(this.handlePasswordChange, 500)}
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
          type === 'store' && (
            <React.Fragment>
              <TextInput
                autoCorrect={false}
                onChangeText={debounce(this.handleNameChange, 500)}
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
                onChangeText={debounce(this.handleDescriptionChange, 500)}
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
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(LoginScreen);
