import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import LoginForm from '../components/auth/LoginForm';
import { firebaseApp } from '../firebase/firebase';
import Spinner from '../components/Spinner';

export default class AuthScreen extends Component {

  onRegister = () => {
    this.props.navigation.navigate('register');
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {

      case true:
        this.props.navigation.navigate('ma')

      case false:
        return <LoginForm />;

      default:
        return <Spinner size='large' />
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ec',
    width: null,
    justifyContent: 'center',
  }
});
