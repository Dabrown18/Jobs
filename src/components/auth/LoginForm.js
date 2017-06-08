import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Animated,
  Keyboard,
  StyleSheet,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import { firebaseApp } from '../../firebase/firebase';
import Spinner from '../Spinner';
import { setUser } from '../../actions/actions';
import { USER_TOKEN } from '../../actions/types';
import * as actions from '../../actions/types';

const logo = require('../../images/logo.png')

export default class LoginForm extends Component {

  onRegister = () => {
    this.props.navigation.navigate('register');
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      showForm: false,
      tokenExists: false,
    };
  }

  login() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  };

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  onLoginFail() {
    this.setState({
      error: 'Login Failed',
      loading: false
    });
  }

  renderButton() {

    if (this.state.loading) {
      return <Spinner size='small' />
    }

    return (
      <View style={LoginStyles.buttonContainer}>
        <Button
          onPress={this.login.bind(this)}
          title='Login'
          color="#fff"
        />
      </View>
    );
  }

  onRegister = () => {
    this.props.navigation.navigate('register');
  };

  render() {

    return (
      <View style={LoginStyles.container}>

          <View style={LoginStyles.content}>

            <Image source={logo} style={LoginStyles.logo}/>

            <View style={LoginStyles.inputContainer}>

              <TextInput
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                autoCorrect={false}
                placeholder="Email"
                style={LoginStyles.input}
              />

              <TextInput
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                placeholder="Password"
                style={LoginStyles.input}
              />

              <Text style={LoginStyles.errorTextStyle}>
                {this.state.error}
              </Text>

              {this.renderButton()}

            </View>

            <View style={LoginStyles.registerContainer}>
              <Button
                onPress={this.onRegister}
                title='Register'
                color='#fff'
              />
            </View>

          </View>

      </View>
    );
  }
}

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ec',
    width: null,
    justifyContent: 'center'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 95
  },
  logo: {
    width: 350,
    height: 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(137,178,224,0.2)',
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    textAlign: 'center'
  },
  buttonContainer: {
    marginBottom: 8,
    padding: 8,
    borderColor: '#fff',
    backgroundColor: '#89b2e0'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  registerContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 10,
    borderColor: '#fff',
    backgroundColor: '#89b2e0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#fff"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});
