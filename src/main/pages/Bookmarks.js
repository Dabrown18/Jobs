import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import styles from '../../../styles'
import Header from '../Header'
import StoryCard from './components/StoryCard'
import Spinner from 'react-native-spinkit'
import { usersRef } from '../../../firebase'
import { USER_TOKEN } from '../../../constants'
import { testing } from '../../../app'

// TODO store data in asyncStorage to increase loadSpeeds

class Bookmarks extends Component {
  constructor(props) {
    super(props)
    this.state = {bookmarks: [], bookmarksRef: ''}
  }

  componentDidMount() {
    console.log('props in bookmarks', this.props);
    if (this.props.user.bookmarks) {
      let bookmarks = [];
      let bookmarksObject = this.props.user.bookmarks;
      console.log('bookmarksObject', bookmarksObject);
      // console.log('bookmarks', this.props.user.bookmarks);
      for (var key in bookmarksObject) {
        bookmarks.push(bookmarksObject[key]);
      }
      this.setState({bookmarks});

      // console.log('found bookmarks in props.user'. this.props.user.bookmarks);
      // this.setState({bookmarks: this.props.user.bookmarks});
    } else {
      console.log('looking for bookmarks in firebase');
      const uid = this.props.uid ? this.props.uid : this.props.user.uid;
      console.log('uid', uid);
      const bookmarksRef = usersRef.child(uid).child('bookmarks');
      this.initializeBookmarks(bookmarksRef);
    }




    if (testing) {
      // TODO fill with new data
      console.log('testin in bookmarks')
    }
  }


  initializeBookmarks(ref) {
    let bookmarks = [];
    ref.once('value', snap => {
      snap.forEach(value => {
        // console.log('value.val()', value.val());
        bookmarks.push(value.val());
      })
      this.setState({bookmarks});
      console.log('bookmarks', bookmarks);
    })
  }


  render() {
    // TODO add spinning loader
    return (
      <View style={[styles.flex1, styles.background]}>
        <Header
          title='Bookmarks'
        />
        <View style={styles.pageBody}>
          <ScrollView contentContainerStyle={{padding: 10}}>
            {/*{
              this.state.bookmarks.map((storyObject, index) =>
                <StoryCard
                  key={index}
                  storyObject={storyObject}
                  navigator={this.props.navigator}
                />
              )
            }*/}
          </ScrollView>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {user: state.user}
}

export default connect(mapStateToProps, null)(Bookmarks)
