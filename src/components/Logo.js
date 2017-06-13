import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const logo = require('../images/header.png');

export default class Logo extends Component {
  render() {
    return (
        <Image
          style={styles.logo}
          source={logo}
        />
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 280,
    height: 70,
    alignItems: 'flex-start',
    justifyContent: 'center',
    resizeMode: 'contain'
  }
});
