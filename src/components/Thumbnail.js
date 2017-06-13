import React, { PropTypes } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Title from './Title';

const Thumbnail = ({ url, titleText, accentColor, style }) => {
  const imageStyle = {
    backgroundColor: '${accentColor}77' // adds transparency to the color
  };
  const TitleComponent = <Title style={styles.title}>{titleText}</Title>;

  return(
    <View stlye={[styles.container, { borderColor: accentColor }, style]}>
        <Image style={[styles.image]} source={{ uri: url }}>
          <Title style={styles.title}>{titleText}</Title>
        </Image>
    </View>
  );
};

Thumbnail.propTypes = {
  style: View.propTypes.style,
  url: PropTypes.string.isRequired,
  titleText: PropTypes.string,
  accentColor: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderStyle: 'solid'
  },
  image: {
    height: 100,
    justifyContent: 'flex-end'
  },
  title: {
    padding: 5
  }
});

export default Thumbnail;
