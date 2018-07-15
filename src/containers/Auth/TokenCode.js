import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import { Color } from '../../constants';
import { dynamicSize, getFontSize } from '../../helpers/DynamicSize';
import CustomButton from '../../components/button';
import CustomHeader from '../../components/header';
import CustomInput from '../../components/input';
import { Authorization, BottomLine, Button2, Button3, Key, NumberBackground, Timer } from '../../constants/images';

class TokenCode extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      tokens: [1, 3, 5, 7, 6, 9],
      remainedTime: 1
    };
  }

  componentDidMount() {
    this.startTimer();
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  startTimer() {
    const handle = this;
    setTimeout(() => {
      handle.decreaseRemainedTime();
    }, 1000);
  }

  decreaseRemainedTime() {
    if (!this.mounted) return;
    if(this.state.remainedTime > 4) return;
    this.setState({ remainedTime: this.state.remainedTime + 1 });
    this.startTimer(this.state.remainedTime + 1);
  }

  convert(time) {
    const M = Math.floor(time / 60);
    const S = time % 60;
    return `0${S}`;
  }

  onSendLink() {
    this.props.navigation.navigate('token_notification');
  };

  signOut() {
    this.props.navigation.navigate('login');
  };

  render() {
    const { tokens, remainedTime } = this.state;
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
              <Text style={styles.authorization}>6 DIGIT TOKEN</Text>
              <Image source={BottomLine} style={styles.welcomeImage} />
              <View style={styles.tokenView}>
              {
              tokens.map((code, i) => (
                <ImageBackground source={NumberBackground} imageStyle={{resizeMode: 'stretch'}} style={styles.codeBackground} key={i}>
                  <Text style={styles.codeNumber} key={i}>{code}</Text>
                </ImageBackground>    
              ))
              }
              </View>
              <ImageBackground source={Timer} imageStyle={{resizeMode: 'stretch'}} style={styles.timerView}>
                <Text style={styles.timerCode}>{this.convert(remainedTime)}</Text>
                <Image source={BottomLine} style={styles.welcomeImage} />
                <Text style={styles.timerSecond}>SECONDS</Text>
              </ImageBackground>
            </View>
            <View style={{alignItems: 'center'}}>
              <CustomButton
                src={Button2}
                text="TRANSACTION"
                backgroundColor={Color.tranas}
                color={Color.white}
                onPress={this.onSendLink.bind(this)}
                style={styles.sendButton}
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
    width: null,
    height: dynamicSize(275),
    alignItems: 'center',
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
    height: dynamicSize(520),
    borderColor: "#dddddd"
  },
  logoView: {
    alignItems: 'center',
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
    width: dynamicSize(220),
  },
  authorization: {
    textAlign: 'center',
    color: Color.text,
    fontSize: getFontSize(36),
    marginBottom: dynamicSize(8),
    marginTop: dynamicSize(20)
  },
  welcomeImage: {
    alignItems: 'center',
    height: dynamicSize(4),
    width: dynamicSize(55),
    marginBottom: dynamicSize(20)
  },
  tokenView: {
    flex: 1,
    flexDirection: 'row',
  },
  codeBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    height: dynamicSize(45),
    width: dynamicSize(45),
    marginHorizontal: dynamicSize(2)
  },
  codeNumber: {
    color: Color.white,
    fontSize: getFontSize(23),
    fontWeight: 'bold'
  },
  timerView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: dynamicSize(270),
    width: dynamicSize(270),
    marginTop: dynamicSize(50),
  },
  timerCode: {
    color: Color.darkgray,
    fontSize: getFontSize(95),
    fontWeight: '200',
  },
  timerSecond: {
    color: Color.darkgray,
    fontSize: getFontSize(20)
  },
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, undefined)(TokenCode);
