import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  CameraRoll,
  Platform
} from 'react-native'
import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-menu'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import styles from '../../../styles'
import { firebaseApp, storage } from '../../../firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import Spinner from 'react-native-spinkit'
import Icon from 'react-native-vector-icons/FontAwesome'
import { updateUser } from '../../../actions/index'
import { iconSize } from './pageConstants'
import Header from '../Header'
import { USER_TOKEN } from '../../../constants'

const options = [{symbol: '♂', title: 'Male'}, {symbol: '♀', title: 'Female'}];
let navigator = null;

function rightButton(signOut) {
  return (
    <MenuContext>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Menu>
          <MenuTrigger>
            <Icon name="cog" size={iconSize} style={styles.headerIcon}/>
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{width: 80}}
          >
            {/*<MenuOption style={styles.menuOption} value={'blog'}>
              <Text style={styles.menuText}>Blog</Text>
            </MenuOption>*/}
            <MenuOption style={styles.menuOption}>
              <TouchableOpacity
                onPress={() => {
                  firebaseApp.auth().signOut().then(() => {
                    navigator.popToTop()
                  }, error => {
                    console.log('error', error)
                  })
                }}
              >
                <Text style={styles.menuText}>Log Out</Text>
              </TouchableOpacity>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </MenuContext>
  )
}

// testBio: "A great coach with plenty of experience on relationship advice. In fact my bio spans so many characters and I can't contain all of these qualifications in just a couple of words."
const defaultBio = 'Reading stories and helping out';

class Profile extends Component {
  state = {
    editMode: false,
    content: {},
    genderClicked: false,
    user: {
      bio: defaultBio
    },
    profile: null,
    loadingProfile: false,
    bioFlex: 1,
    bioLength: defaultBio.length
  }

  constructor(props) {
    super(props);
    navigator = this.props.navigator;
  }


  componentDidMount() {
    AsyncStorage.getItem(USER_TOKEN)
    .then(response => {
      if (response) {
        let user = JSON.parse(response);
        if (user) {
          // TODO add firease bio
          // TESTING
          // profileBio = "A great coach with plenty of experience on relationship advice. In fact my bio spans so many characters and I can't contain all of these qualifications in just a couple of words. A great coach with plenty of experience on relationship advice. In fact my bio spans so many characters and I can't contain all of these qualifications in just a couple of words.";
          profileBio = this.state.user.bio;
          // profileBio = "Trying a bio of medium length. This should expand to two lines but stay in one flex. This should now extend upon the second flex because it exceeds 88 characters.";
          // TESTING
          this.setState({user: {...user, bio: profileBio}});
          this.expandBio(profileBio.length);
        }
      }
    })
    // this.expandBio(this.state.user.bio.length);
  }

  leftButton() {
    return (
      <Icon
        size={iconSize}
        style={[styles.headerIcon, {flex: 1}]}
        name="pencil"
        onPress={() => this.edit()}
      />
    )
  }

  changeProfile(uri, mime = 'application/octet-stream') {
    let user = firebaseApp.auth().currentUser;

    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    const uploadUri = Platform.OS == 'ios' && uri ? uri.replace('file://', '') : uri;
    const title = user.uid;
    let uploadBlob = null;
    const imageRef = storage.ref('profileImages').child(`${title}`);

    ImageResizer.createResizedImage(uploadUri, 250, 250, 'JPEG', 50)
      .then((resizedImageUri) => {
      fs.readFile(resizedImageUri, 'base64')
        .then((data) => {
          return Blob.build(data, {type: `${mime};BASE64`})
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: 'image/jpeg' })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          let json = {profile: url};
          this.setState({profile: url, loadingProfile: false});
          this.props.updateUser(json, user.uid);
        })
        .catch((error) => {
          console.log('blob error', error)
        })
    })
  }

  selectPicture() {
    ImagePicker.showImagePicker({}, (response) => {
      this.setState({loadingProfile: true});
      this.changeProfile(response.uri);
    })
  }

  renderGenderRow(title, sex) {
    console.log('sex', sex);
    console.log('content', this.state.content);
    return (
      <View style={styles.profileRow}>
        <View style={styles.genderButtons}>
        {
          this.state.editMode
          ? options.map((option, index) => {
            return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    let json = this.state.content;
                    json.sex = option.title.toLowerCase()
                    this.setState({content: json})
                  }}
                >
                  <Text style={styles.profileGenderText}>
                    {
                      this.state.content.sex === option.title.toLowerCase() ?
                        option.symbol
                      : <Text style={styles.profileTextUnderline}>{option.symbol}</Text>
                    }
                  </Text>
                </TouchableOpacity>
              )
            })
          : <View>
              <Text style={styles.profileGenderText}>
                {sex === 'male' ? '♂' : '♀'}
              </Text>
            </View>
        }
        </View>
      </View>
    )
  }

  renderAge(age) {
    return (
      this.state.editMode ?
        <TextInput
          defaultValue={age}
          keyboardType={'number-pad'}
          onChangeText={text => this.setContent(text, 'age')}
          style={[styles.profileAgeInput, styles.profileAgeText]}
        />
      : <Text style={[styles.profileText, styles.profileAgeText]}>
          {age}
        </Text>
    )
  }

  expandBio(length) {
    console.log('expandBio length', length);
    // for every 150 characters increase the flex
    const bioFlex = Math.ceil(length/88);
    console.log('newFlex', bioFlex);
    this.setState({bioFlex})
  }

  renderBio(profileBio) {
    console.log('TextInput in bio', TextInput);

    // expand the flex of the textInput based on the text length
    return (
      <View style={[{flex: this.state.bioFlex}, styles.profileBio]}>
        {
          this.state.editMode
            ? <TextInput
                defaultValue={profileBio}
                keyboardType={'default'}
                onChangeText={text => {
                  this.setContent(text, 'bio');
                }}
                multiline={true}
                style={styles.profileBioInput}
              />
            : <Text style={styles.profileBioText}>{profileBio}</Text>
        }
      </View>
    )
  }

  edit() {
    this.setState({editMode: !this.state.editMode});
  }

  save() {
    this.props.updateUser(this.state.content, this.props.user.uid);
    this.setState({editMode: false});
    // TODO add

    console.log('expand the bio based of the bio in content state', this.state.content);
    // this.expandBio(this.state.content.bio.text.length);
  }

  setContent(text, type) {
    let json = this.state.content;
    json[type] = text;
    this.setState({content: json})
  }

  // TODO fill out method
  calculateFollowers() {
    let followers = '1.2k';
    // use a fuzzy string method to convert the numbers into user freindly numbers
    // 1_000 = 1k, 1_000_000 = 1m, 1_300_000 = 1.3m, etc.

    return `${followers} followers`;
  }

  renderCoachView() {
    // TODO grab the coach status from the user profile
    let coach = true;

    return (
      coach
      ? <View style={styles.profileRow}>
          <Text style={styles.profileCoachText}>Coach</Text>
        </View>
      : <View style={styles.profileRow}>
          <Text style={[styles.profileCoachText, styles.profileHiddenText]}>Hidden</Text>
        </View>
    )
  }


  // TODO display whether or not the user is a coach

  render() {
    // TODO make sure it takes the state profile as priorty
    let profileUrl = require('../../../images/profileIconBlack.png');
    if (this.props.user.profile) {
      profileUrl = {uri: this.props.user.profile};
    }
    if (this.state.profile) {
      profileUrl = {uri: this.state.profile};
    }

    let profileName = this.state.user.name && this.props.user.name === null
                      ? this.state.user.name
                      : this.props.user.name;

    let profileSex = this.state.user.sex && this.props.user.sex === null
                      ? this.state.user.sex
                      : this.props.user.sex;

    let profileAge = this.state.user.age && this.props.user.age === null
                      ? this.state.user.age
                      : this.props.user.age;

    let profileBio = this.state.user.bio && this.props.user.bio === null
                      ? this.state.user.bio
                      : this.props.user.bio;

    // TODO remove after firebase is working
    // TODO fix bio section to work with firebase
    // console.log('this.state.user', this.state.user);
    // profileBio = this.state.user.bio;


    return (
      <View style={styles.flex1}>
        <Header
          title='Profile'
          rightButton={rightButton}
          leftButton={this.leftButton.bind(this)}
        />
        {/*TODO add follower count*/}
        <View style={[styles.pageBody, styles.background]}>
          {
            <View style={styles.profileTop}>
              <View style={styles.profileFollowers}>
                {/*<Text>Followers</Text>*/}
                <Icon name="group" size={26}/>
                <Text>{this.calculateFollowers()}</Text>
              </View>
              <View style={styles.profileTopInfo}>
                <View style={styles.profilePhotoContainer}>
                  {
                    this.state.loadingProfile
                    ? <Spinner type='ThreeBounce'/>
                    : <Image style={styles.profilePhoto} source={profileUrl}/>
                  }
                </View>
                {
                  this.state.editMode
                  ? <TouchableOpacity onPress={() => this.selectPicture()}>
                      <Text style={styles.link}>Change Profile Picture</Text>
                    </TouchableOpacity>
                  :
                    <View>
                      {/*NOTE the white text makes it appear hidden against the background*/}
                      <Text style={styles.profileHiddenText}>taking space</Text>
                    </View>
                }
              </View>
              <View style={styles.flex1}><Text style={styles.profileHiddenText}>balance</Text></View>
            </View>
          }
          <View style={styles.profileInfo}>
            <View style={styles.profileRow}>
              <View style={styles.profileContent}>
                {
                  this.state.editMode
                  ? <TextInput
                      defaultValue={profileName}
                      keyboardType={'default'}
                      onChangeText={text => this.setContent(text, 'name')}
                      style={styles.profileInput}
                    />
                  : <Text style={styles.profileText}>{ profileName }</Text>
                }
              </View>
            </View>
            {/*TODO add COACH badge*/}
            {this.renderCoachView()}
            {this.renderBio(profileBio)}
            <View style={styles.profileInfoSecondary}>
              <View style={[styles.flex1, styles.profileAge]}>
                {this.renderAge(profileAge)}
              </View>
              {/*TODO add logic:
                 if this is a self profile, change to edit/save button
                 else, have a follow button
              */}
              {
                this.state.editMode
                ? <TouchableOpacity
                    style={[styles.buttonContainer, styles.flex2]}
                    onPress={() => this.save()}
                  >
                    <Text style={styles.button}>Save</Text>
                  </TouchableOpacity>
                : <TouchableOpacity
                    style={[styles.buttonContainer, styles.flex2]}
                    onPress={() => this.edit()}
                  >
                    <Text style={styles.button}>Edit</Text>
                  </TouchableOpacity>
              }
              <View style={[styles.flex1, styles.profileGender]}>
                {this.renderGenderRow('Sex', profileSex)}
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = function(state) {
  let { user } = state;
  return { user }
}

export default connect(mapStateToProps, { updateUser })(Profile)
