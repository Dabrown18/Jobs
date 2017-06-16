import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  Button,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { updateStory, changePage } from '../actions/actions';
import { submitStory, getStoryKey } from '../helpers/userDbActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import { storage } from '../firebase/firebase'
//import RNFetchBlob from 'react-native-fetch-blob'
import Spinner from '../components/Spinner';
import { INDEX } from '../main/pages/pageConstants'

class ImageScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingPicture: false,
      image: null,
      loaded: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Choose an Image',
    headerLeft:
      <Button
        title='Back'
        onPress={() => { navigation.navigate('Category'); }}
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(0,122,255,1)'
      />,
    headerRight:
      <Button
        title='Next'
        onPress={() => { navigation.navigate('Details'); }}
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(0,122,255,1)'
      />,
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  })

  render() {
    let defaultPhoto = require('../images/defaultPhoto.png');
    let photo = this.state.image ? {uri: this.state.image} : defaultPhoto;

    return (
      <View style={styles.page}>

        <View style={styles.pageBody}>

          <View style={styles.coverPhotoContainer}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.photoButton]}
              onPress={() => this.selectPicture()}
            >
              <Text style={styles.button}>
                Choose a Photo
              </Text>
            </TouchableOpacity>
            {
              this.state.loadingPicture ?
              <Spinner type="ThreeBounce"/>:
              <Image
                style={styles.coverPhoto}
                source={photo}
              />
            }
            {
              this.state.loaded ?
              <TouchableOpacity
                style={[styles.buttonContainer, styles.photoButton]}
                onPress={() => this.submit()}
              >
                <Text style={styles.button}>
                  Save and Submit
                </Text>
              </TouchableOpacity> :
              <View></View>
            }
          </View>
        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#faf8ec'
  },
  pageBody: {
    flex: 20,
    justifyContent: 'center'
  },
  headerIcon: {
    color: '#000'
  },
  headerIconFilled: {
    color: 'red'
  },
  categoryText: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  let {user, story} = state;
  return {user, story};
}

export default ImageScreen;
