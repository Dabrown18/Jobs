import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import styles from '../../../styles'
import Header from '../Header'
import Icon from 'react-native-vector-icons/FontAwesome'
import { usersByEmailsRef } from '../../../firebase'
import { sanitize } from '../../../helpers/methods'

// Have a searchBar that shows results for stories and users

// OnSearch ->
// return a listView of users that come up in the query
// separate results into normal users and coa
// return a listView of stories that come up in the query

// TODO use the quora link to accomplish partial search on users

// also run the search on storiesByStamps

const iconSize = 16

class Search extends Component {
  state = { query: '' };

  constructor(props) {
    super(props);
  }

  searchUser(query) {
    console.log('conducting query search for users');
    // query = 'test';
    usersByEmailsRef.orderByKey().startAt(query).endAt(`${query}\uf8ff`).on('value', snap => {
      console.log('snap', snap);
      snap.forEach(value => {
        console.log('value', value.val());
      })
    })
  }


  search() {
    // use the state of query to conduct the search
    console.log('query', this.state.query);
    let { query } = this.state;
    this.searchUser(query);
  }

  // TODO create a method that renders a row header with accompanying data
  // will allow easy modularization of user data, vs. stories data, vs. eventually videos data

  render() {
    return (
      <View style={[styles.flex1, styles.background]}>
        <Header
          title='Search'
        />
        <View style={[styles.pageBody, styles.searchPage]}>
          <View style={styles.searchBar}>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder='Find stories, users, and coaches...'
                autoCapitalize={'none'}
                onChangeText={query => {
                  this.setState({query})
                }}
                onEndEditing={() => this.search()}
              >
              </TextInput>
              <TouchableOpacity
                style={styles.searchInputButton}
                onPress={() => this.search()}
              >
                <Icon name="search" size={iconSize} style={styles.searchIcon}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Search



// NOTES

// exact search:

// var ref = new Firebase("https://yyyy.firebaseio.com/");
// ref.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
//   console.log(snapshot.key());
// });

// partial search:
// var ref = new Firebase("https://yyyy.firebaseio.com/");
// ref.orderByKey().startAt("b").endAt("b\uf8ff").on("child_added", function(snapshot) {
//   console.log(snapshot.key());
// });
