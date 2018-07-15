import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { Color } from '../constants';
import { dynamicSize, getFontSize } from '../helpers/DynamicSize';

export default class CustomButton extends Component {
  static propTypes = {
    imageButton: PropTypes.bool,
    src: PropTypes.number,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    text: PropTypes.string.isRequired,
    hasIcon: PropTypes.bool,
    icon: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
    style: PropTypes.object.isRequired,
    buttonWidth: PropTypes.number,
  }

  static defaultProps = {
    imageButton: true,
    backgroundColor: Color.light,
    hasIcon: false,
    color: Color.white,
    icon: '',
    borderColor: '',
    buttonWidth: dynamicSize(220)
  }

  render() {
    const { imageButton, src, icon, hasIcon, text, backgroundColor, color, style, borderColor, buttonWidth } = this.props;
    const buttonContainer = {
      width: buttonWidth,
      flexDirection: hasIcon ? 'row' : 'column',
      alignItems: 'center',
      justifyContent: hasIcon ? null : 'center',
      height: dynamicSize(55),
      paddingHorizontal: dynamicSize(20),
      backgroundColor,
      borderWidth: 1,
      borderColor: borderColor !== '' ? borderColor : Color.trans,
      borderRadius: 40
    };
    return (
      <TouchableOpacity style={style} onPress={() => this.props.onPress()}>
        <View style={buttonContainer}>
        {
          imageButton ? 
            <ImageBackground source={src} imageStyle={{resizeMode: 'stretch'}} style={[styles.backgroundImage, {width: buttonWidth}]}>
              <Text style={[styles.buttonText, { color }]}>{text}</Text>
            </ImageBackground>
          : <View>
              <Text style={[styles.buttonText, { color }]}>{text}</Text>
            </View>
        }
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: dynamicSize(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: getFontSize(18),
    fontWeight: '700'
  },
  icon: {
    width: dynamicSize(24),
    height: dynamicSize(24),
    resizeMode: 'contain',
    marginRight: dynamicSize(20)
  },
  mIcon: {
    width: dynamicSize(24),
    fontSize: 22,
    color: Color.white,
    marginRight: dynamicSize(20)
  }
});
