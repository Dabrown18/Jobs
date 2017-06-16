// detail page shown when a user clicks on the one of the indexed stories
// bookmark the story, or follow/unfollow the user
// rememeber to perform the above locally, then when finished send to the server

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView, 
  Image
} from 'react-native'
import { connect } from 'react-redux'
import { setUser, submitComment } from '../../../actions'
import styles from '../../../styles'
import storyStyles from '../../storyFlow/styles'
import StoryHeader from '../../storyFlow/StoryHeader'
import Icon from 'react-native-vector-icons/FontAwesome'
import { iconSize } from './pageConstants'
import { getBookmarkKey, addBookmark, checkBookmark, removeBookmark } from '../../../helpers/userDbActions'
import moment from 'moment'

class StoryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {story: {}, author: '', bookmarkKey: '', hasBookmark: false, comments: []}
  }

  componentWillMount() {
    let story = this.props.story.story;
    console.log('story', story);
    let author = story.user;
    let bookmarkKey = getBookmarkKey(this.props.story);
    let hasBookmark = checkBookmark(bookmarkKey, this.props.user);
    let comments = [];
    let commentsObj = story.comments;
    if (commentsObj) {
      for (let comment in commentsObj) {
        comments.push(commentsObj[comment]);
      }
    }
    this.setState({story, author, bookmarkKey, hasBookmark, comments});
  }

  addBookmark() {
    let authorUid = this.state.author.uid;
    let {storyKey, stampKey} = this.state.story;
    let sex = this.props.user.sex;
    addBookmark(this.props.story, this.props.user, authorUid, storyKey, stampKey, sex);
    this.props.setUser(this.props.user.uid);
    this.setState({hasBookmark: true});
  }

  removeBookmark() {
    // console.log('calling removeBookmark');
    let authorUid = this.state.author.uid;
    let {storyKey, stampKey} = this.state.story;
    let sex = this.props.user.sex;
    console.log('this.props.story', this.props.story, 'user', this.props.user, 'uathorUid', authorUid, 'storyKey', storyKey, 'sex', sex)
    removeBookmark(this.props.story, this.props.user, authorUid, storyKey, stampKey, sex);
    this.props.setUser(this.props.user.uid);
    this.setState({hasBookmark: false});
  }

  rightButton() {
    if (this.state.hasBookmark) {
      return (
        <TouchableOpacity onPress={() => this.removeBookmark()}>
          <Icon name="bookmark" size={iconSize} style={styles.headerIconFilled}/>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => this.addBookmark()}>
          <Icon name="bookmark" size={iconSize} style={styles.headerIcon}/>
        </TouchableOpacity>
      )
    }
  }

  submitComment() {
    let json = {user: this.props.user, comment: this.state.comment, timestamp: new Date().toString()};
    let storyKey = this.state.story.storyKey;
    let authorUid = this.state.author.uid;
    this.props.submitComment(json, authorUid, storyKey);
    // also add locally
    let comments = this.state.comments.concat([json]);
    this.setState({comments});
  }

  sanitizeName(name) {
    return name.length > 11 ? name.replace(" ", "\n") : name;
  }

  renderComment(commentObj, index) {
    let { comment, user, timestamp } = commentObj;
    timestamp = moment(new Date(timestamp)).fromNow();
    let profileUrl = require('../../../images/profileIconBlack.png');
    profileUrl = user.profile ? {uri: user.profile} : profileUrl;
    return (
      <View style={storyStyles.comment} key={index}>
        <Text style={storyStyles.commentText}>
          {comment}
          {'\n\n'}
          <Text style={{fontStyle: 'italic'}}>{timestamp}</Text>
        </Text>
        <View style={storyStyles.commentUser}>
          <View>
            <Text>{this.sanitizeName(user.name)}</Text>
            <Text>{user.sex}, {user.age}</Text>
          </View>
          <View>
            <Image
              style={storyStyles.commentProfile}
              source={profileUrl}
            />
          </View>
        </View>
      </View>
    )
  }

  renderComments(commentsObj) {
    let comments = this.state.comments;
    return (
      <View style={styles.comments}>
        {comments.map((comment, index) => this.renderComment(comment, index))}
      </View>
    )
  }

  render() {
    let {story, author} = this.state;
    let comment = null;
    return (
      <View style={storyStyles.page}>
        {/*Header with back button*/}
        <StoryHeader
          title='Story'
          type='storyDetail'
          navigator={this.props.navigator}
          rightButton={this.rightButton.bind(this)}
        />
        {/*TODO fix scrolling*/}
        <View style={storyStyles.pageBody}>
          <ScrollView>
            <View style={storyStyles.pageSection}>
              <Text style={[styles.text, storyStyles.pageTitle]}>{story.storyTitle.text}</Text>
            </View>
            <View style={storyStyles.pageSection}>
              <Text style={styles.text}>{story.storyStarted.text}</Text>
            </View>
            <View style={storyStyles.pageSection}>
              <Text style={styles.text}>{story.storyChanged.text}</Text>
            </View>
            <View style={storyStyles.pageSection}>
              <Text style={styles.text}>{story.storyQuestion.text}</Text>
            </View>
            {/*User comments*/}
            <View style={storyStyles.pageSection}>
              <Text style={storyStyles.commentTitle}>Comments</Text>
              {/*TODO map over the comments*/}
              <View>
                {this.renderComments(story.comments)}
              </View>
            </View>
            <View style={storyStyles.pageSection}>
              <Text style={storyStyles.commentTitle}>Offer Your Thoughts</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                placeholder='...'
                onChangeText={text => this.setState({comment: text})}
              />
              <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.submitComment()}
              >
                <Text style={styles.button}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {story: state.story, user: state.user}
}

export default connect(mapStateToProps, { setUser, submitComment })(StoryDetail)
