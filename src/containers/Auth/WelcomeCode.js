import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import { Color } from '../../constants';
import { dynamicSize, getFontSize } from '../../helpers/DynamicSize';
import CustomButton from '../../components/button';
import CustomHeader from '../../components/header';
import CustomInput from '../../components/input';
import { AuthPage, HomeMark, BottomLine, Button1 } from '../../constants/images';

class WelcomeCode extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      remainedTime: 300
    };
  }

  onSubmit() {
    this.props.navigation.navigate('token_code');
  }

  render() {
    const { code, remainedTime } = this.state;
    return (
      <Container style={styles.container}>
        <ImageBackground source={AuthPage} imageStyle={{resizeMode: 'stretch'}} style={styles.backgroundImage}>
          <View style={styles.content}>
            <Text style={styles.headerText}>{`CELL PHONE NUMBER\nVALIDATED SUCCESSFULLY,`}</Text>
            <Image source={BottomLine} style={styles.welcomeImage} />
            <Text style={styles.welcomeText}>WELCOME TO</Text>
            <Image source={HomeMark} style={styles.pageMark} />
            <CustomButton
              src={Button1}
              text="GET NEW 6 DIGIT TOKEN"
              backgroundColor={Color.trans}
              color={Color.white}
              onPress={this.onSubmit.bind(this)}
              style={styles.authButton}
              buttonWidth={dynamicSize(235)}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: Color.white,
    fontSize: getFontSize(20),
    textAlign: 'center',
    marginBottom: dynamicSize(15)
  },
  welcomeImage: {
    height: dynamicSize(5),
    width: dynamicSize(65),
    borderRadius: 3,
    marginBottom: dynamicSize(15)
  },
  welcomeText: {
    color: Color.white,
    fontSize: getFontSize(30),
    fontWeight: 'bold'
  },
  pageMark: {
    width: dynamicSize(250),
    height: dynamicSize(170),
    margin: dynamicSize(50),
  },
  authButton: {
    marginTop: dynamicSize(15)
  }
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, undefined)(WelcomeCode);
