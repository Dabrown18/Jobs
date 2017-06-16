import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import { setStory } from '../../../../actions'
import styles from '../../../../styles'

class StoryCard extends Component {
  constructor(props) {
    super(props)
  }

  limitText(text) {
    return text.length > 35 ? text.substring(0, 35) + '...' : text
  }

  toStoryDetail(storyObject) {
    // console.log('storyObject', storyObject);
    this.props.setStory(storyObject);
    this.props.navigator.push({name: 'storyDetail'})
  }

  render() {
    let {story, user} = this.props.storyObject;
    // console.log('story in storyCard', story);
    let maleBookmarkCount = 0;
    let femaleBookmarkCount = 0;
    if (story.bookmarks) {
      for (bookmark in story.bookmarks["male"]) {
        maleBookmarkCount++;
      }
      for (bookmark in story.bookmarks["female"]) {
        femaleBookmarkCount++;
      }
    }

    let defaultPhoto = require('../../../../images/defaultPhoto.png');
    let photo = story.image ? {uri: story.image} : defaultPhoto;

    return (
      <TouchableOpacity
        style={styles.storyCard}
        onPress={() => this.toStoryDetail(this.props.storyObject)}
      >
        <Image
          source={photo}
          style={styles.storyCardPhoto}
        >
          <Text style={styles.storyCardTitle}>
            {this.limitText(story.storyTitle.text)}
            {'\n'}
            <Text style={styles.storyCardCategory}>{story.category}</Text>
          </Text>
          <Text style={styles.storyCardLikes}><Text style={styles.maleText}>♂{maleBookmarkCount}</Text>   <Text style={styles.femaleText}>♀{femaleBookmarkCount}</Text></Text>
        </Image>
      </TouchableOpacity>
    )
  }
}

export default connect(null, { setStory })(StoryCard)
