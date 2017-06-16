import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';

const couple = require('../images/couple.png');

export default class SubmitScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Submit',
    headerLeft:
        <Button
          title='Back'
          onPress={() => { navigation.navigate('Details'); }}
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

        <View style={styles.containerTwo}>

          <Text style={styles.inputText}>
            Be sure to proof read before submitting.
          </Text>

          <View style={styles.buttonContainer}>

            <Button
              title='Submit'
              color='#fff'
            />

          </View>

        </View>

        <View style={styles.containerThree}>

          <Image source={couple} style={styles.image}/>

        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ec'
  },
  containerTwo: {
    flex: 3
  },
  containerThree: {
    flex: 7
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 10,
    borderColor: '#fff',
    backgroundColor: '#88b0d3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  image: {
    width: 400,
    height: 350,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  inputText: {
    fontSize: 20,
    color: '#000',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center'
  }
});
