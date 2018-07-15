import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Container, Content } from 'native-base';

import { ActionCreators } from '../../actions';
import { Color } from '../../constants';
import { dynamicSize, getFontSize } from '../../helpers/DynamicSize';
import CustomButton from '../../components/button';
import CustomHeader from '../../components/header';
import CustomInput from '../../components/input';

import { Authorization, BottomLine, Button1, Button3, Key } from '../../constants/images';


class AuthorizationCode extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      confirm: '',
      errorType: ''
    };
  }
  
  onSendLink() {
    this.props.navigation.navigate('welcome_code');
    console.log('props: ', this.props)
    const data = {
      email: this.props.userDetail.email,
      password: this.props.userDetail.password,
      authCode: this.state.code
    };
    
    // this.props.sendAuthCode(data);
  };

  signOut() {
    this.props.signOut();
  };

  render() {
    const { code, confirm, errorType } = this.state;
    return (
      <Container style={styles.container}>
        <ImageBackground source={Authorization} imageStyle={{resizeMode: 'stretch'}} style={styles.backgroundImage}>
          <CustomButton
            src={Button3}
            text="SIGNOUT"
            backgroundColor={Color.trans}
            color={Color.white}
            onPress={this.signOut.bind(this)}
            style={styles.button}
            buttonWidth={dynamicSize(180)}
          />
        </ImageBackground>
        <View style={styles.content}>
          <View style={styles.inputView}>
            <View style={styles.logoView} >
              <Text style={styles.authorization}>AUTHORIZATION</Text>
              <Image source={BottomLine} style={styles.welcomeImage} />
            </View>
            <CustomInput
              type="blue"
              src={Key}
              label="Enter 6 Digit Code"
              placeholder="Enter 6 Digit Code"
              textColor="#303030"
              placeholderColor="#414547"
              value={code}
              keyboardType="numeric"
              onChangeText={text => this.setState({ code: text })}
              secure
              isError={errorType === 'password'}
              borderColor="#dddddd"
              errorText="Code must be over 6 digits in length"
            />
            <View style={{alignItems: 'center'}}>
              <CustomButton
                src={Button1}
                text="SEND"
                backgroundColor={Color.trans}
                color={Color.white}
                onPress={this.onSendLink.bind(this)}
                style={styles.sendButton}
                buttonWidth={dynamicSize(180)}
              />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = {
  container: {
    backgroundColor: Color.white,
    flex: 1,
  },
  backgroundImage: {
    alignItems: 'center',
    width: null,
    height: dynamicSize(275),
  },
  content: {
    flex: 1,
  },
  inputView: {
    marginTop: dynamicSize(-150),
    marginHorizontal: dynamicSize(25),
    backgroundColor: Color.white,
    borderRadius: dynamicSize(10),
    borderWidth: 2,
    height: dynamicSize(500),
    borderColor: "#dddddd"
  },
  logoView: {
    alignItems: 'center',
    marginBottom: dynamicSize(50)
  },
  button: {
    alignItems: 'center',
    marginTop: dynamicSize(30),
    marginHorizontal: dynamicSize(20),
    width: dynamicSize(180),
  },
  sendButton: {
    alignItems: 'center',
    marginTop: dynamicSize(20),
    marginHorizontal: dynamicSize(20),
    width: dynamicSize(180),
  },
  authorization: {
    textAlign: 'center',
    color: '#414547',
    fontSize: getFontSize(36),
    marginBottom: dynamicSize(8),
    marginTop: dynamicSize(20)
  },
  welcomeImage: {
    alignItems: 'center',
    height: dynamicSize(4),
    width: dynamicSize(55),
  },
};

function mapStateToProps(state) {
  return {
    userDetail: state.auth.userDetail
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationCode);
