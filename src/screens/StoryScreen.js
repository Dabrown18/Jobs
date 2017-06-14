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
  Platform
} from 'react-native';
import { connect } from 'react-redux';

import { firebaseApp } from '../firebase/firebase';
import Spinner from '../components/Spinner';
import { setUser } from '../actions/actions';
import { USER_TOKEN } from '../actions/types';
import * as actions from '../actions/types';
import DualPicker from '../components/DualPicker';
import Header from '../components/Header';

const logo = require('../images/logo.png')

export default class StoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      age: 10,
      sex: '',
      language: ''
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Story',
    headerRight:
      <Button
        title='Next'
        onPress={() => { navigation.navigate('Settings'); }}
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(0,122,255,1)'
      />,
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  })

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

  render() {

    return (
      <View style={styles.container}>

        <Image source={logo} style={styles.logo}/>

          <View style={styles.content}>

            <View style={styles.inputContainer}>

              <Text style={styles.inputText}>Title:</Text>

              <TextInput
                onChangeText={title => this.setState({ title })}
                autoCorrect={false}
                placeholder="Title"
                style={styles.input}
              />

              <Text style={styles.inputText}>Age:</Text>

              <TextInput
                placeholder='Age'
                style={styles.input}
                onChangeText={age => this.setState({ age })}
                keyboardType={'number-pad'}
              />

              <Text style={styles.inputText}>Your sex:</Text>

              <DualPicker
                title='Gender'
                options={[{symbol: '♂', title: 'Male'}, {symbol: '♀', title: 'Female'}]}
                ref="sexPicker"
              />

            </View>

          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    height: 95,
    flex: 8.5,
  },
  logo: {
    width: 350,
    height: 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
    resizeMode: 'contain',
    marginTop: 20
  },
  inputContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    padding: 20,
    paddingBottom: 35,
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
    textAlign: 'left',
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
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#fff"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  section: {
    flex: 1
  },
  headerSection: {
    flex: 1.28
  },
  contentSection: {
    flex: 8.5
  },
  inputText: {
    fontSize: 20,
    color: '#000',
    textShadowColor: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 5
  }
});
