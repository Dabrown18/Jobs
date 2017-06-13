import React, { Component } from 'react';
import { View, Text, Platform, Button } from 'react-native';


export default class StoryScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerRight:
      <Button
        title='Settings'
        onPress={() => { navigation.navigate('settings'); }}
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(0,122,255,1)'
      />,
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  render() {
    return (
      <View>
        <Text>StoryScreen</Text>
        <Text>StoryScreen</Text>
        <Text>StoryScreen</Text>
        <Text>StoryScreen</Text>
        <Text>StoryScreen</Text>
        <Text>StoryScreen</Text>
      </View>
    );
  }
}
