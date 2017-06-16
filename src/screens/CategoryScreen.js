// allow the user to pick a category
// then push to the dashboard with the selected data
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Button
} from 'react-native'
import { connect } from 'react-redux';

//import { updateStory } from '../actions/actions';
//import { submitStory, getStoryKey } from '../helpers/userDbActions';
import styles from '../styles/mainStyles';
import { categories } from '../categories';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconSize } from '../main/pages/pageConstants';
//import ImagePicker from 'react-native-image-picker';
//import ImageResizer from 'react-native-image-resizer';
//import { storage } from '../firebase/firebase';
//import RNFetchBlob from 'react-native-fetch-blob';


class CategoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: categories[0]
    };
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
        style={categoryStyles.categoryRow}
        onPress={() => this.setState({category})}
      >
        <Text style={categoryStyles.categoryText}>
          {category}
        </Text>
        {
          this.state.category === category ?
          <Icon size={iconSize} name="check-circle" style={categoryStyles.headerIcon}/> :
          <Icon size={iconSize} name="circle" style={categoryStyles.headerIcon}/>
        }
      </TouchableOpacity>
    )
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Choose a Category',
    headerLeft:
      <Button
        title='Back'
        onPress={() => { navigation.navigate('Story'); }}
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(0,122,255,1)'
      />,
    headerRight:
      <Button
        title='Next'
        onPress={() => { navigation.navigate('Image'); }}
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(0,122,255,1)'
      />,
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  })

  render() {
    return (
      <View style={categoryStyles.page}>
        <View style={categoryStyles.pageBody}>
          <ScrollView>
            {categories.map((category, index) => this.renderCategoryRow(category, index))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const categoryStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#faf8ec',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pageBody: {
    flex: 20,
    justifyContent: 'flex-start'
  },
  headerIcon: {
    color: '#000'
  },
  headerIconFilled: {
    color: 'red'
  },
  categoryText: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps(state) {
  let {user, story} = state;
  return {user, story};
}

export default CategoryScreen;
