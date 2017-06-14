// allow the user to pick a category
// then push to the dashboard with the selected data
import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'
import { connect } from 'react-redux';
import { updateStory } from '../actions/actions'
import { submitStory, getStoryKey } from '../../helpers/userDbActions'
import storyStyles from './styles'
import styles from '../styles/mainStyles'
import { categories } from '../categories'
import Icon from 'react-native-vector-icons/FontAwesome'
import { iconSize } from '../main/pages/pageConstants'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import { storage } from '../../firebase'
import RNFetchBlob from 'react-native-fetch-blob'


class CategoryPicker extends Component {
  state = {
    category: categories[0]
  }

  constructor(props) {
    super(props);
    console.log('this.props', this.props);
  }

  // TODO this function will also add this story to the categories reference in the database
  submit() {
    let json = {category: this.state.category};
    this.props.updateStory(json, this.props.user.uid);
    this.props.navigator.push({name: 'photoPicker'});
  }

  renderCategoryRow(category, index) {
    return (
      <TouchableOpacity
        key={index}
        style={storyStyles.categoryRow}
        onPress={() => this.setState({category})}
      >
        <Text style={storyStyles.categoryText}>
          {category}
        </Text>
        {
          this.state.category === category ?
          <Icon size={iconSize} name="check-circle" style={styles.headerIcon}/> :
          <Icon size={iconSize} name="circle" style={styles.headerIcon}/>
        }
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={storyStyles.page}>
        <View style={storyStyles.pageBody}>
          <ScrollView>
            {categories.map((category, index) => this.renderCategoryRow(category, index))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  let {user, story} = state;
  return {user, story};
}

export default CategoryScreen;
