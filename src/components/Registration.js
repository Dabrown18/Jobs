import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Picker,
  Animated,
  Keyboard
} from 'react-native';
import styles from '../styles/mainStyles';
import DualPicker from '../components/DualPicker';

export default class AuthScreen extends Component {

  state = {
    feedback : '', email : '', firstName : '', lastName : '', age : 10,
    password : '', viewOffSet : new Animated.Value(0)
  }

  signup() {
    let {email, password, firstName, lastName, age} = this.state;
    let sex = this.refs.sexPicker.state.selected.toLowerCase();
    let user = {email, password, firstName, lastName, age, sex}
  }

  componentDidMount() {
    Keyboard.addListener('keyboardWillShow', e => {
      Animated.timing(this.state.viewOffSet, {
        toValue : 400,
        duration : 50
      }).start()
    })

    Keyboard.addListener('keyboardWillHide', e => {
      Animated.timing(this.state.viewOffSet, {
        toValue : 0,
        duration : 50
      }).start()
    })
  }

  render() {

    return(
      <Animated.View>
        <Animated.View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../images/plain-heart.png')}/>
        </Animated.View>
        <Text style={styles.feedback}>{this.state.feedback}</Text>
        <TextInput
          placeholder="First Name"
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
        />
        <TextInput
        placeholder="Age"
        style={styles.input}
        keyboardType={'number-pad'}
        />
        {/* Get a reference to the picked gender from the custom picker */}
        {/* DualPicker */}
        <DualPicker
          title='Gender'
          options={[{symbol: '♂', title: 'Male'}, {symbol: '♀', title: 'Female'}]}
          ref='sexPicker'
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          autoCapitalize={'none'}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() => this.signup()}
          style={styles.buttonContainer}
        >
          <Text style={styles.button}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigator.pop()}
        >
          <Text style={styles.link}>Already signed up? Sign in</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
