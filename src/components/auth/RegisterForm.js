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

import { firebaseApp } from '../../firebase/firebase';
import Spinner from '../Spinner';
import { setUser } from '../../actions/actions';
import { USER_TOKEN } from '../../actions/types';
import * as actions from '../../actions/types';
import DualPicker from '../DualPicker';

const logo = require('../../images/logo.png')

export default class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: [],
      loading: false,
      showForm: false,
      tokenExists: false
    };
  }

  onRegisterPressed() {
    let { username, firstname, lastname, email, password } = this.state
    let user = { username, firstname, lastname, email, password }

    console.log('called signup with ', email, password);

    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        addUser({ username, firstname, lastname, email, password }, user.uid)
        console.log('User successfully added')
      })
      .catch(error => {this.setState({feedback: error.message})});
      console.log('User not added')
  }

  render() {

    return (
      <View style={RegisterStyles.container}>

          <View style={RegisterStyles.content}>

            <View style={RegisterStyles.inputContainer}>

              <TextInput
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                autoCorrect={false}
                placeholder="Username"
                style={RegisterStyles.input}
              />

              <TextInput
                value={this.state.firstname}
                onChangeText={firstname => this.setState({ firstname })}
                autoCorrect={false}
                placeholder="First Name"
                style={RegisterStyles.input}
              />

              <TextInput
                value={this.state.lastname}
                onChangeText={lastname => this.setState({ lastname })}
                placeholder="Last Name"
                style={RegisterStyles.input}
              />

              <TextInput
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                autoCorrect={false}
                placeholder="Email"
                style={RegisterStyles.input}
              />

              <TextInput
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                placeholder="Password"
                style={RegisterStyles.input}
              />

              <TextInput
                value={this.state.password_confirmation}
                onChangeText={password_confirmation => this.setState({ password_confirmation })}
                secureTextEntry={true}
                placeholder="Re-Enter Password"
                style={RegisterStyles.input}
              />

            </View>

            <TouchableOpacity
              style ={RegisterStyles.registerContainer}
              onPress={() => this.props.navigator.push({ name : 'signup' })}
              onPress={() => this.onRegisterPressed()}
            >
              <Text style={RegisterStyles.registerText}>Get Started</Text>
            </TouchableOpacity>

          </View>

      </View>
    );
  }
}

const RegisterStyles = StyleSheet.create({
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
    marginBottom: 10,
    padding: 10,
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
    padding: 20,
    borderColor: '#fff',
    backgroundColor: '#89b2e0',
    borderRadius: 8
  },
  registerText: {
    fontSize: 16,
    textAlign: 'center',
    color: "#fff"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});
