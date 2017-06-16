import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { changePage } from '../../actions'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles, { WHITE } from '../../styles'
import * as pageTypes from './pages/pageConstants'

// FOOTER COMPONENTS
// Index, Search, Story, Bookmarks, Profile
const iconSize = 22;
class Footer extends Component {
  render() {
    return (
      <View style={styles.pageFooter}>
        <TouchableOpacity
          style={styles.footerElement}
          onPress={() => this.props.changePage(pageTypes.INDEX)}
        >
          <Icon name="home" size={iconSize} style={styles.footerElementText}/>
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.footerElement}
         onPress={() => this.props.changePage(pageTypes.SEARCH)}
       >
          <Icon name="search" size={iconSize} style={styles.footerElementText}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerElement}
          onPress={() => this.props.changePage(pageTypes.STORY)}
        >
          <Icon name="plus" size={iconSize} style={styles.footerElementText}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerElement}
          onPress={() => this.props.changePage(pageTypes.BOOKMARKS)}
        >
          <Icon name="bookmark" size={iconSize} style={styles.footerElementText}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerElement}
          onPress={() => this.props.changePage(pageTypes.PROFILE)}
        >
          <Icon name="user" size={iconSize} style={styles.footerElementText}/>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, { changePage })(Footer)
