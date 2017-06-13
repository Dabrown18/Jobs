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
  Button,
  Platform,
  connect
} from 'react-native';

import { firebaseApp } from '../firebase/firebase';
import Spinner from '../components/Spinner';
import { Authentication } from '../router';
// import * as actions from '../actions';
import { setUser } from '../actions/actions';

const logo = require('../images/logo.png');

export default class AuthScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      showForm: false,
      tokenExists: false,
      loggedIn: null
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

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {

      case true:
        this.props.navigation.navigate('map')

      case false:
        return <LoginForm />;

      default:
        return <Spinner size='large' />
    }
  }

  register = () => {
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
                onPress={this.register}
                title='Register'
                color='#fff'
                hitSlop={{
                  top: 10,
                  left: 5,
                  right: 5,
                  bottom: 10
                }}
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
    borderRadius: 8
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    textAlign: 'center',
    borderRadius: 8
  },
  buttonContainer: {
    marginBottom: 8,
    padding: 8,
    borderColor: '#fff',
    backgroundColor: '#89b2e0',
    borderRadius: 8
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
    justifyContent: 'center',
    borderRadius: 8
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
