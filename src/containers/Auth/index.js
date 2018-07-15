import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { Container } from 'native-base';
import OneSignal from 'react-native-onesignal';

import { Color } from '../../constants';
import { dynamicSize } from '../../helpers/DynamicSize';
import CustomButton from '../../components/button';
import { AuthPage, HomeMark, Button1 } from '../../constants/images';


class Auth extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      authType: 'signup',
    };
  }

  componentWillMount() {
    OneSignal.init("1751d8b8-d5e4-4d05-99c4-7664691b8fdb");
  
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }
  
  onToggle(authType) {
    this.setState({ authType });
  }

  signInWithEmail() {
    this.props.navigation.navigate('email_signin');
  }

  render() {
    const { authType } = this.state;
    return (
      <Container style={styles.container}>
        <ImageBackground source={AuthPage} imageStyle={{resizeMode: 'stretch'}} style={styles.backgroundImage}>
          <View style={styles.markView}>
            <Image source={HomeMark} style={styles.pageMark} />
            <CustomButton
              src={Button1}
              text="SIGN IN"
              backgroundColor={Color.trans}
              color={Color.white}
              onPress={this.signInWithEmail.bind(this)}
              style={styles.authButton}
              buttonWidth={dynamicSize(190)}
            />
          </View>
        </ImageBackground>
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
    flex: 1,
    width: null,
    height: null,
  },
  content: {
    padding: 10,
  },
  pageView: {
    flex: 0.9,
    paddingBottom: dynamicSize(50)
  },
  header: {
    width: dynamicSize(80),
    height: dynamicSize(80),
    resizeMode: 'contain',
  },
  markView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: dynamicSize(70)
  },
  pageMark: {
    width: dynamicSize(252),
    height: dynamicSize(170),
    resizeMode: 'cover'
  },
  pageImage: {
    width: dynamicSize(305),
    height: dynamicSize(266),
    resizeMode: 'contain',
  },
  pageImageView: {
    flex: 1,
    padding: dynamicSize(20),
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleButtonView: {
    borderRadius: dynamicSize(6),
    backgroundColor: Color.light,
    padding: 4,
    flexDirection: 'row',
    width: dynamicSize(198),
    height: dynamicSize(40)
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dynamicSize(6),
  },
  authButton: {
    top: dynamicSize(90)
  }
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, undefined)(Auth);
