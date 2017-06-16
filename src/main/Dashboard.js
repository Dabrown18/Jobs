import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { setUser } from '../../actions'
import styles from '../../styles'
import { firebaseApp } from '../../firebase'
import { getUser } from '../../helpers/userDbActions'
import * as pageTypes from './pages/pageConstants'
import { Footer, Index, Search, Story, Bookmarks, Profile } from '../index'

class Dashboard extends Component {


  renderPage() {
    switch(this.props.page.activePage) {
      case pageTypes.INDEX:
        return <Index navigator={this.props.navigator}/>
      case pageTypes.SEARCH:
        return <Search />
      case pageTypes.STORY:
        return <Story navigator={this.props.navigator}/>
      case pageTypes.BOOKMARKS:
        return <Bookmarks user={this.props.user} uid={this.props.uid} navigator={this.props.navigator}/>
      case pageTypes.PROFILE:
        return <Profile user={this.props.user} navigator={this.props.navigator}/>
    }
  }


  render() {
    return (
      <View style={styles.page}>
        <View style={styles.pageBody}>
          {this.renderPage()}
          {/*place the signout into the profile*/}
        </View>
        <Footer/>
      </View>
    )
  }
}

// have an active page
function mapStateToProps(state) {
  let { user, page } = state;
  return {user, page}
}

export default connect(mapStateToProps, { setUser })(Dashboard)
