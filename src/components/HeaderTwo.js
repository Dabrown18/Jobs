import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default class SearchScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchText: ''
      };
      this.searchNews = this.searchNews.bind(this);
    }

    searchNews(text) {
      this.setState({ searchText: text });
      this.props.searchNews(text);
    }

    render() {
      return (
        <View style={styles.searchPage}>
          <View >
            <View style={styles.search}>
              <TextInput
                style={styles.input}
                onChangeText={this.searchNews}
                value={this.state.searchText}
                placeholder={"Search for stories"}
                placeholderTextColor={'grey'}
              />
            </View>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    searchPage: {
      backgroundColor: '#faf8ec',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2
    },
    input: {
      height: 25,
      color: 'darkgrey',
      paddingHorizontal: 5,
      flex: 1,
    },
    search: {
      backgroundColor: '#fff',
      borderColor: '#000',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      margin: 5,
      marginTop: 25,
      marginBottom: 10,
      borderRadius: 8
    }
  });
