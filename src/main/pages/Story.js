import React, { Component } from 'react'
import {
  View, 
  Text, 
  TextInput, 
  TouchableOpacity 
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Spinner from 'react-native-spinkit'
import Header from '../Header'
import styles from '../../../styles'
import storyStyles from '../../storyFlow/styles'
import { updateStory } from '../../../actions'

// TODO add AsyncStorage to Stories
class Story extends Component {
  state = {title: ''}

  constructor(props) {
    super(props);
  }

  next() {
    this.props.updateStory({storyTitle: {text: this.state.title}})
    this.props.navigator.push({name: 'storyForm'})
  }

  render() {
    return (
      <View style={[styles.flex1, styles.background]}>
        <Header
          title='Write a Story'
        />
        <View style={styles.pageBody}>
          <View style={{justifyContent: 'flex-start', flex: 1, padding: 10}}>
            <TextInput
              placeholder='Give your a story a title...'
              style={storyStyles.pageInputTitle, storyStyles.titleInput}
              onChangeText={title => this.setState({title})}
            />
            <TouchableOpacity
              style={[styles.buttonContainer, storyStyles.buttonMargin]}
              onPress={() => this.next()}
            >
              <Text style={styles.button}>next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(null, { updateStory })(Story)
