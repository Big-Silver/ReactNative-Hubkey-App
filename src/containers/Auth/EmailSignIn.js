import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Container, Content } from 'native-base';
import { NavigationActions } from 'react-navigation'
import CookieManager from 'react-native-cookies';

import { ActionCreators } from '../../actions';
import { Color } from '../../constants';
import { dynamicSize, getFontSize } from '../../helpers/DynamicSize';
import validator from '../../helpers/Validation';
import CustomButton from '../../components/button';
import CustomHeader from '../../components/header';
import CustomInput from '../../components/input';
import { Background, User, Phone, Key, Email, Button1, BottomLine } from '../../constants/images';


class EmailSignIn extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phoneNumber: '',
      password: '',
      errorType: ''
    };
  }

  componentDidMount() {
    if (this.props.isSigned) {
      this.props.navigation.navigate('authorization_code');
    }
  }

  onLogin() {
    let signInfo = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phoneNumber,
      previousPhone: this.props.previousPhone
    }
    const emailError = validator('email', this.state.email);
    const passwordError = validator('password', this.state.password);
    const phoneError = validator('phone', this.state.phoneNumber);
    if (emailError) {
      this.setState({
        errorType: 'email'
      });
      alert(emailError);
    } else if (passwordError) {
      this.setState({
        errorType: 'password'
      });
      alert(passwordError);
    } else if (phoneError) {
      this.setState({
        errorType: 'phonenumber'
      });
      alert(phoneError);
    } else {
      this.setState({
        errorType: ''
      });
      CookieManager.getAll()
      .then((res) => {
      });
      CookieManager.clearAll()
      .then((res) => {
        this.props.signIn(signInfo);
      });
    }
  }

  render() {
    const { email, phoneNumber, password, errorType } = this.state;
    const { isSigned, error, errorMsg } = this.props;
    return (
      <Container style={styles.container}>
        <ImageBackground source={Background} imageStyle={{resizeMode: 'stretch'}} style={styles.backgroundImage}>
          {/* <CustomHeader
            title='Sign In'
            left='Back'
            hasBackIcon
            theme='trans'
            onPressLeft={() => this.props.navigation.goBack()}
          /> */}
          <Content contentContainerStyle={styles.content}>
            <View style={styles.welcomeView}>
              <Text style={styles.welcomeText}>USER SIGN IN</Text>
              <Image source={BottomLine} style={styles.welcomeImage} />
            </View>
            <View style={styles.inputView}>
              {/* <CustomInput
                type='blue'
                src={User}
                label='Name'
                placeholder='Name'
                keyboardType='default'
                value={name}
                onChangeText={text => this.setState({ name: text })}
                isError={errorType === 'name'}
                errorText='Invalid Name'
              /> */}
              <CustomInput
                type='blue'
                src={Phone}
                label='Cell Number'
                placeholder='Cell Number'
                keyboardType='phone-pad'
                value={phoneNumber}
                onChangeText={text => this.setState({ phoneNumber: text })}
                isError={errorType === 'phonenumber'}
                errorText='Invalid Phone Number'
              />
              <CustomInput
                type='blue'
                src={Email}
                label='Email'
                placeholder='Email'
                keyboardType='email-address'
                autocapitalize='none'
                value={email}
                onChangeText={text => this.setState({ email: text })}
                isError={errorType === 'email'}
                errorText='Invalid Email'
              />
              <CustomInput
                type='blue'
                src={Key}
                label='Password'
                placeholder='Password'
                secure
                value={password}
                onChangeText={text => this.setState({ password: text })}
                isError={errorType === 'password'}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <CustomButton
                src={Button1}
                text='CONFIRM DATA'
                backgroundColor={Color.trans}
                color={Color.white}
                onPress={this.onLogin.bind(this)}
                style={styles.button}
                buttonWidth={dynamicSize(190)}
              />
            </View>
          </Content>
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
    flex: 1,
  },
  welcomeView: {
    alignItems: 'center',
    paddingTop: dynamicSize(120),
    paddingBottom: dynamicSize(40),
  },
  welcomeText: {
    fontSize: getFontSize(30),
    marginBottom: dynamicSize(2),
    color: Color.white
  },
  welcomeImage: {
    alignItems: 'center',
    height: dynamicSize(4),
    width: dynamicSize(55),
  },
  inputView: {
    justifyContent: 'center',
    paddingHorizontal: dynamicSize(20),
    marginBottom: dynamicSize(20)
  },
  labelText: {
    fontSize: getFontSize(16),
    color: Color.text,
    marginBottom: dynamicSize(5)
  },
  forgotView: {
    alignItems: 'flex-end'
  },
  forgotText: {
    fontSize: 12,
    color: Color.darkblue
  },
  button: {
    marginBottom: dynamicSize(30),
    alignItems: 'center',
    width: dynamicSize(190),
  }
};

function mapStateToProps(state) {
  return {
    isSigned: state.auth.signed,
    previousPhone: state.auth.userDetail.previousPhone,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignIn);
