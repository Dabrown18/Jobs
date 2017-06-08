import { StyleSheet, Dimensions } from 'react-native'

import { WHITE, BLACK, BEIGE, NAVY, BLUE, GRAY } from './colors'
import { Avenir, DidotItalic } from './fonts'

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  background: {
    backgroundColor: WHITE,
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 1
  },
  flex3: {
    flex: 3
  },
  flex4: {
    flex: 4
  },
  flex5: {
    flex: 5
  },
  text: {
    fontFamily: Avenir
  },
  whiteText: {
    color: '#fff'
  },
  maleText: {
    fontFamily: Avenir,
    color: WHITE
    // color: '#1976d2' // LIGHT BLUE
  },
  femaleText: {
    fontFamily: Avenir,
    color: WHITE
    // color: '#c2185b' // PINK
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 40,
    backgroundColor: BEIGE
  },
  logo: {
    flex: 1,
    resizeMode: 'contain'
  },
  logoContainer: {
    width: width - 80,
    height: 95,
    alignItems: 'center'
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    margin: 2,
    textAlign: 'center',
    fontFamily: Avenir
  },
  // DUALPICKER styles
  dualPicker: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    textAlign: 'center'
  },
  dualPickerOption: {
    flex: 1
  },
  dualPickerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dualPickerText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Avenir
  },
  dualPickerSelected: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Avenir
  },
  // **
  buttonContainer: {
    height: 40,
    backgroundColor: BLUE,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 2,
    padding: 8,
    margin: 2
  },
  button: {
    textAlign: 'center',
    color: BLACK,
    flex: 1,
    fontFamily: Avenir,
    // fontWeight: 'bold'
    fontSize: 16
  },
  feedback: {
    color: BLACK,
    textAlign: 'center',
    fontFamily: Avenir
  },
  link: {
    color: BLACK,
    textAlign: 'center'
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  alignItems: {
    alignItems: 'center'
  },
  // ***** APPLICATION *****
  page: {
    flex: 1
  },
  pageBody: {
    flex: 20,
    justifyContent: 'center'
  },
  pageFooter: {
    flex: 2,
    flexDirection: 'row',
  },
  footerElement: {
    flex: 1,
    // backgroundColor: BEIGE,
    borderColor: '#000',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerElementText: {
    color: BLACK,
    fontSize: 22
  },
  header: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: BEIGE,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 7,
    paddingBottom: 13
  },
  headerTitle: {
    fontFamily: DidotItalic,
    color: BLACK,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 6
  },
  headerIcon: {
    color: BLACK
  },
  headerIconFilled: {
    color: BLUE
  },
  headerHiddenIcon: {
    color: BEIGE
  },
  largeTitle: {
    color: BLACK,
    textAlign: 'center',
    fontSize: 22
  },
  menuOption: {
    backgroundColor: BEIGE,
    borderWidth: 1
  },
  menuText: {
    textAlign: 'center',
    color: BLACK,
    fontFamily: Avenir
  },
  // PROFILE...
  profileContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profileHiddenText: {
    color: '#fff'
  },
  profileCoachText: {
    // TODO make large,
    fontSize: 18,
    fontFamily: DidotItalic
  },
  profileTop: {
    flexDirection: 'row',
    flex: 0.5,
    justifyContent: 'space-around',
  },
  profileTopInfo: {
    flex: 1.75,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileFollowers: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },
  profilePhotoContainer: {
    width: 150,
    height: 150,
    borderColor: '#000',
    margin: 5
  },
  profilePhoto: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    borderRadius: 75,
    borderWidth: 2,
  },
  profileInfo: {
    alignItems: 'center',
    flex: 1,
    width: width
  },
  profileInfoSecondary: {
    flex: 7,
    flexDirection: 'row'
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginBottom: 0
  },
  profileBio: {
    padding: 5,
    margin: 5
  },
  profileBioText: {
    textAlign: 'auto'
  },
  profileBioInput: {
    color: BLACK,
    fontSize: 14,
    textAlign: 'center',
    height: 30,
    width: width-20,
    padding: 5,
    margin: 5,
    marginTop: -8
  },
  profileTitle: {
    fontFamily: DidotItalic,
    color: BLACK,
    fontSize: 22,
    fontFamily: Avenir
  },
  profileContent: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  profileText: {
    color: BLACK,
    fontSize: 20,
    marginTop: 5,
    fontFamily: Avenir,
    textAlign: 'center'
  },
  profileAge: {
    alignItems: 'flex-end'
  },
  profileAgeText: {
    fontSize: 26,
    padding: 6,
    paddingRight: 10
  },
  profileGender: {
    alignItems: 'flex-start'
  },
  profileGenderText: {
    color: BLACK,
    fontSize: 26,
    fontFamily: Avenir,
    textAlign: 'center'
  },
  profileTextUnderline: {
    color: BEIGE,
    textShadowColor: BLACK,
    textShadowOffset: { width: 1, height: 1 },
  },
  profileButtonWrap: {
    flex: 2
  },
  profileButtonContainer: {
    height: 40,
    backgroundColor: BLUE,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginBottom: 50
  },
  profileButton: {
    textAlign: 'center',
    color: BLACK,
    flex: 1,
    fontFamily: Avenir,
    width: width - 100,
  },
  profileInput: {
    color: BLACK,
    fontSize: 20,
    height: 34,
    width: 150,
    paddingTop: 5,
    borderRadius: 2,
    fontFamily: Avenir,
    textAlign: 'center'
  },
  profileAgeInput: {
    color: BLACK,
    fontSize: 20,
    height: 36,
    width: 100,
    margin: 6,
    padding: 0,
    marginLeft: 18,
    marginRight: 0,
    marginTop: 8,
    fontFamily: Avenir,
    textAlign: 'right'
  },
  profileIcon: {
    color: BEIGE
  },
  genderButtons: {
    flexDirection: 'row'
  },
  // STORY CARD
  storyCard: {
    flex: 1,
    backgroundColor: GRAY,
    marginBottom: 5,
    borderColor: '#000',
    borderWidth: 1,
    // padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  storyCardContent: {
    flex: 3,
    borderRightWidth: 0.25
  },
  storyCardLikes: {
    textAlign: 'left',
    marginRight: 5,
    fontStyle: 'italic',
    backgroundColor: 'transparent',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: BLACK,
    textShadowOffset: { width: 1, height: 1 }
  },
  storyCardUser: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5
  },
  storyCardProfile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1
  },
  storyCardPhoto: {
    width: width-100,
    height: width-100,
    flex: 3,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    padding: 10,
    opacity: 0.9
  },
  storyCardTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: DidotItalic,
    backgroundColor: 'transparent',
    color: WHITE,
    fontSize: 20,
    textShadowColor: BLACK,
    textShadowOffset: { width: 1, height: 1 }
  },
  storyCardCategory: {
    fontFamily: Avenir,
    fontSize: 14,
  },
  searchPage: {
    justifyContent: 'flex-start'
  },
  searchBar: {

  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 5,
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    margin: 4,
    marginRight: 2,
    textAlign: 'left',
    fontFamily: Avenir
  },
  searchInputButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 40,
    margin: 4,
    marginLeft: 2,
    borderRadius: 2,
    backgroundColor: BLUE
  },
  searchIcon: {
    color: WHITE,
    textShadowColor: BLACK,
    textShadowOffset: { width: 0.25, height: 0.25 }
  }
})
