import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class Settings extends Component {
  render() {
    return (
      <ScrollView>
        <List>
          <ListItem
            title="Notifications"
          />
          <ListItem
            title="Profile"
          />
          <ListItem
            title="Password"
          />
        </List>
        <List>
          <TouchableOpacity>
            <ListItem
              title="Sign Out"
              rightIcon={{ name: 'cancel' }}
            />
          </TouchableOpacity>
        </List>
      </ScrollView>
    );
  }
}
