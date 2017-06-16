import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TextInput
} from 'react-native';

export default class DetailsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Share Your Story',
    headerLeft:
      <Button
        title='Back'
        onPress={() => { navigation.navigate('Image'); }}
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(0,122,255,1)'
      />,
    headerRight:
      <Button
        title='Next'
        onPress={() => { navigation.navigate('Submit'); }}
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

        <View style={styles.borderContainer}>

          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ text })}
          />

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ec',
  },
  borderContainer: {
    flex: 1,
    backgroundColor: '#89b2e0',
    margin: 10,
    borderRadius: 8

  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    textAlign: 'left',
    borderRadius: 8
  }
});
