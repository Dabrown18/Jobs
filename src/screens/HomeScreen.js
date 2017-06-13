import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import NewsFeed from './NewsFeed';
import Header from '../components/Header';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.section}>
        <View style={styles.headerSection}>
          <Header />
        </View>
        <View style={styles.contentSection}>
          <NewsFeed />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 1
  },
  headerSection: {
    flex: 1.28
  },
  contentSection: {
    flex: 8.5
  }
});
