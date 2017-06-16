import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from '../../styles'

// import in every page that needs a header
class Header extends Component {
  title;
  rightButton;
  leftButton;

  constructor(props) {
    super(props);
    title = props.title;
    leftButton = props.leftButton;
    rightButton = props.rightButton;
  }

  render() {
    return (
      <View style={styles.header}>
        {leftButton ? leftButton() : <View></View>}
        <View style={{flex: 5, alignItems: 'center'}}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        {rightButton ? rightButton() : <View></View>}
      </View>
    );
  }
}

export default Header;
