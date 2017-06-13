import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

const logo = require('../images/header.png');

export default class Header extends Component{
  render() {
    return (
      <View style={styles.viewStyle}>
        <Image
          style={styles.logo}
          source={logo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#faf8ec',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  logo: {
    marginTop: 10,
    width: 50,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    resizeMode: 'contain'
  }
});
