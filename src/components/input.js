import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';
import { Icon } from 'native-base';
import { Color } from '../constants';
import { dynamicSize, getFontSize } from '../helpers/DynamicSize';

export default class CustomInput extends Component {
  static propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    src: PropTypes.number,
    value: PropTypes.string.isRequired,
    secure: PropTypes.bool,
    autocapitalize: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    keyboardType: PropTypes.string,
    errorText: PropTypes.string,
    isError: PropTypes.bool,
    borderColor: PropTypes.string,
    label: PropTypes.string.isRequired,
    onRef: PropTypes.func,
    editable: PropTypes.bool,
    placeholderColor: PropTypes.string,
    textColor: PropTypes.string,
  }

  static defaultProps = {
    type: 'default',
    placeholder: '',
    secure: false,
    autocapitalize: 'sentences',
    keyboardType: 'default',
    borderColor: 'default',
    placeholderColor: 'default',
    textColor: 'default',
    errorText: '',
    isError: false,
    onRef: () => undefined,
    editable: true
  }

  constructor(props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  componentDidMount() {
    this.props.onRef(this.input);
  }

  render() {
    const { type, placeholder, src, value, secure, keyboardType, editable, isError, errorText, label, textColor, borderColor, placeholderColor, autocapitalize } = this.props;
    return (
      <View style={styles.inputContent}>
        {
          type === 'default' ? (
            label === 'none' ? null
              :
              <Text style={styles.labelText}>{label}</Text>
            ) : null
        }
        <View style={[styles.inputView, { borderColor: isError ? 'red' : this.state.focus ? Color.blue : borderColor !== 'default' ? borderColor : Color.lightgray }]}>
          {
            type === 'default' ? (
              <TextInput
                ref={ref => this.input = ref}
                style={[styles.input, {color: textColor === 'default' ? Color.white : textColor}]}
                placeholder={placeholder}
                secureTextEntry={secure}
                value={value}
                editable={editable}
                keyboardType={keyboardType}
                autocapitalize={autocapitalize}
                placeholderTextColor={placeholderColor === 'default' ? 'white' : placeholderColor}
                placeholderTextColor="red"
                underlineColorAndroid="transparent"
                onChangeText={text => this.props.onChangeText(text)}
                onFocus={() => this.setState({ focus: true })}
                onBlur={() => this.setState({ focus: false })}
              />
            )
            :
            (
              <View style={styles.iconButtonView}>
                <Image source={src} style={styles.inputIcon}>
                </Image>
                <TextInput
                  ref={ref => this.input = ref}
                  style={[styles.input, {color: textColor === 'default' ? Color.white : textColor}]}
                  placeholder={placeholder}
                  secureTextEntry={secure}
                  value={value}
                  editable={editable}
                  placeholderTextColor={placeholderColor === 'default' ? 'white' : placeholderColor}
                  keyboardType={keyboardType}
                  autoCapitalize={autocapitalize}
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.props.onChangeText(text)}
                  onFocus={() => this.setState({ focus: true })}
                  onBlur={() => this.setState({ focus: false })}
                />
              </View>
            )
          }
        </View>
        {
          errorText.length > 0 && isError ?
            <View style={styles.errorView}>
              <Icon name="close" style={styles.errorIcon} />
              <Text style={styles.errorText}>{errorText}</Text>
            </View>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContent: {
    paddingHorizontal: dynamicSize(20),
    marginBottom: dynamicSize(20)
  },
  inputView: {
    height: dynamicSize(50),
    padding: dynamicSize(10),
    justifyContent: 'center',
    borderRadius: dynamicSize(30),
    borderWidth: 2,
    backgroundColor: Color.trans
  },
  input: {
    flex: 1,
    margin: 0,
    paddingHorizontal: dynamicSize(10),
    fontSize: 19,
  },
  iconButtonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dynamicSize(10),
  },
  inputIcon: {
    height: dynamicSize(20),
    width: dynamicSize(20),
    resizeMode: 'contain'
  },
  labelText: {
    fontSize: getFontSize(16),
    color: Color.gray,
    marginBottom: dynamicSize(5)
  },
  errorView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: dynamicSize(5)
  },
  errorIcon: {
    color: 'red',
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    paddingLeft: dynamicSize(5)
  }
});
