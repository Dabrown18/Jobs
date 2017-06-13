import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default class BookmarkScreen extends Component {
  render() {
    return (
      <View style={styles.section}>
        <View style={styles.headerSection}>
          <Header />
        </View>
        <View style={styles.contentSection}>
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
