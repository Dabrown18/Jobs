import React, { Component } from 'react';
import { ScrollView, Button, Platform } from 'react-native';
import { Tile, List, ListItem} from 'react-native-elements';

const profilePhoto = require('../images/profile.jpg')

export default class ProfileScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerRight:
      <Button
        title='Settings'
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
      <ScrollView>
        <Tile
          source={profilePhoto}
          featured
        />

        <List>
          <ListItem
            title="First Name"
            hideChevron
          />
          <ListItem
            title="Last Name"
            hideChevron
          />
        </List>

      </ScrollView>
    );
  }
}
