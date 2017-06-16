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
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import { firebaseApp } from '../firebase/firebase';
import Spinner from '../components/Spinner';
import { setUser } from '../actions/actions';
import { USER_TOKEN } from '../actions/types';
import * as actions from '../actions/types';
import DualPicker from '../components/DualPicker';
import Header from '../components/Header';
import Category from './CategoryScreen';

const logo = require('../images/brokenHeart.png');

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
    title: 'Your Information',
    headerLeft:
      <Button
        title=''
      />,
    headerRight:
      <Button
        title='Next'
        onPress={() => { navigation.navigate('Category'); }}
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(0,122,255,1)'
      />,
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  })

  render() {

    return (

      <View style={styles.container}>

          <View style={styles.content}>

            <View style={styles.inputContainer}>

              <ScrollView>

                <Text style={styles.inputText}>Title:</Text>

                <TextInput
                  onChangeText={title => this.setState({ title })}
                  autoCorrect={false}
                  placeholder="Story title"
                  style={styles.input}
                />

                <Text style={styles.inputText}>Age:</Text>

                <TextInput
                  placeholder='Your age'
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

              </ScrollView>

            </View>



          </View>

          <Image source={logo} style={styles.logo}/>

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
    width: 365,
    height: 137,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#88b0d3',
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
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 5
  }
});
