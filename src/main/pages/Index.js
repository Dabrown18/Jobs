import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { changePage } from '../../../actions'
import Icon from 'react-native-vector-icons/FontAwesome'
import Spinner from 'react-native-spinkit'
import Header from '../Header'
import styles from '../../../styles'
import { iconSize } from './pageConstants'
import { storiesByStampsRef } from '../../../firebase'
import StoryCard from './components/StoryCard'
import { STORY } from './pageConstants'
import { testing } from '../../../app'
import test from '../../../test.json'
const initialLimit = 6 // TODO change to 6

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {stories: [], limit: initialLimit, loaded: false};
  }

  componentDidMount() {
    let storiesObj = test.stories;
    let localStories = [];
    if (testing) {
      console.log('test.json', test);
    } else {
      this.listenForItems(storiesByStampsRef, initialLimit);
    }
  }

  leftButton() {
    return (
      <Icon name="minus" size={iconSize} style={styles.headerHiddenIcon}/>
    )
  }

  rightButton() {
    return (
      <TouchableOpacity onPress={() => this.props.changePage(STORY)}>
        <Icon name="plus-square" size={iconSize} style={styles.headerIcon} />
      </TouchableOpacity>
    )
  }

  createStories(snap) {
    let localStories = [];
    snap.forEach(value => {
      // console.log('value with timestamp key hopefully', value)
      let json = value.val();
      let user = this.props.user;
      // user is the current user. story.user is the author
      story = {user, story: {...json, storyKey: json.user.uid, stampKey: value.key}};
      localStories.push(story);
    })
    return localStories;
  }

  listenForItems(ref, limit) {
    console.log('limit', limit);
    // the child can also be ordered by category
    // I.E. orderByChild('category')
    ref.orderByChild('timestamp').limitToFirst(limit).on('value', snap => {
      let stories = this.createStories(snap);
      this.setState({stories, loaded: true});
    })
  }

  handleScroll(event) {
    let y = event.nativeEvent.contentOffset.y;
    let height = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
    // console.log('y', y);
    // console.log('height', height);

    if (y >= height) {
      console.log('load more data');
      // add a delay to prevent multiple add limits at once
      // show a spinner on new data loading
      if (!this.state.delayAdd) {
        let newLimit = this.state.limit+initialLimit;
        this.setState({limit: newLimit, delayAdd: true, loaded: false});
        console.log('new limit', newLimit);
        storiesByStampsRef.off();
        this.listenForItems(storiesByStampsRef, newLimit);
        setTimeout(() => {
          this.setState({delayAdd: false});
          console.log('no more delay');
        }, 8000) // 8 second delay before you can add again
      }
    }
  }

  // TODO order by most recent post
  // TODO show the loading spinner when it's loading
  // TODO pagination
  render() {
    return (
      <View style={[styles.flex1, styles.background]}>
        <Header
          title='Index'
          rightButton={this.rightButton.bind(this)}
          leftButton={this.leftButton}
        />
        <View style={styles.pageBody}>
          <ScrollView
            contentContainerStyle={{padding: 10}}
            onScroll={this.handleScroll.bind(this)}
            scrollEventThrottle={0}
          >
            {
              this.state.stories.map((storyObject, index) =>
                <StoryCard
                  key={index}
                  storyObject={storyObject}
                  navigator={this.props.navigator}
                />
              )
            }
            {
              !this.state.loaded ?
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                  <Spinner type='ThreeBounce'/>
                </View>
              : <View></View>
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  let {user, page} = state;
  return {user, page};
}

export default connect(mapStateToProps, { changePage })(Index)
