import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import { Color } from '../../constants';
import { dynamicSize, getFontSize } from '../../helpers/DynamicSize';
import CustomButton from '../../components/button';
import CustomHeader from '../../components/header';
import CustomInput from '../../components/input';
import { Authorization, BottomLine, Button2, Button3, Button1, MessageTail } from '../../constants/images';


class TokenNotification extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      name: 'Bernardo Bicalho',
      notification: 'Buy 500 lots of PETR4 at minimum price 2,123 or maximum price 2,130'
    };
  }

  signOut() {
    this.props.navigation.navigate('login');
  };

  onConfirm() {
    this.props.navigation.navigate('transaction');
  }

  onDecline() {
    this.props.navigation.navigate('login');
  }

  render() {
    const { name, notification } = this.state;
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
              <Text style={styles.authorization}>NOTIFICATION</Text>
              <Image source={BottomLine} style={styles.welcomeImage} />
            </View>
            <View style={styles.notificationView}>
              <Text style={styles.notificationName}>{`Dear ${name},`}</Text>
              <Text style={styles.notificationExp}>{`Please approve or decline the following trade deal:`}</Text>
              <Text style={styles.notificationText}>{notification}</Text>
            </View>
            <View style={styles.notificationTail}>
              <Image source={MessageTail} style={styles.dialogTail}></Image>
            </View>
            <View style={{alignItems: 'center'}}>
              <CustomButton
                src={Button2}
                text="CONFIRM"
                backgroundColor={Color.trans}
                color={Color.white}
                onPress={this.onConfirm.bind(this)}
                style={styles.sendButton}
                buttonWidth={dynamicSize(180)}
              />
              <CustomButton
                src={Button1}
                text="DECLINE"
                backgroundColor={Color.trans}
                color={Color.white}
                onPress={this.onDecline.bind(this)}
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
    marginTop: dynamicSize(10),
    marginHorizontal: dynamicSize(20),
    width: dynamicSize(180),
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
  notificationView: {
    backgroundColor: "#008d6c",
    paddingHorizontal: dynamicSize(22),
    paddingVertical: dynamicSize(10),
    borderRadius: 12,
    marginHorizontal: dynamicSize(20),
  },
  notificationName: {
    color: Color.white,
    fontSize: getFontSize(23),
    fontWeight: '600',
    marginBottom: dynamicSize(5),
  },
  notificationExp: {
    color: Color.white,
    fontSize: getFontSize(20),
    marginBottom: dynamicSize(20),
  },
  notificationText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: getFontSize(22),
  },
  notificationTail: {
    alignItems: 'flex-end',
  },
  dialogTail: {
    resizeMode: 'stretch',
    right: dynamicSize(35),
    height: dynamicSize(10),
    width: dynamicSize(20),
    marginTop: dynamicSize(-3),
    marginBottom: dynamicSize(10),
  }
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, undefined)(TokenNotification);
