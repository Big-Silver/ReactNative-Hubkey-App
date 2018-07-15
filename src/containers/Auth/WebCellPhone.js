import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import { Color } from '../../constants';
import { dynamicSize, getFontSize } from '../../helpers/DynamicSize';
import CustomButton from '../../components/button';
import CustomHeader from '../../components/header';
import CustomInput from '../../components/input';
import { Background, BottomLine, Button1 } from '../../constants/images';

class WebCellPhone extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      errorType: ''
    };
  }

  onSendLink() {
    Linking.openURL('https://hubcapital.com.br')
    this.props.navigation.navigate('authorization_code');
  }

  render() {
    const { phoneNumber, errorType } = this.state;
    return (
      <Container style={styles.container}>
        <ImageBackground source={Background} imageStyle={{resizeMode: 'stretch'}} style={styles.backgroundImage}>
          {/* <CustomHeader
            title="Update CellPhone"
            left="Back"
            hasBackIcon
            theme="trans"
            onPressLeft={() => this.props.navigation.goBack()}
          /> */}
          <Content contentContainerStyle={styles.content}>
            <View style={styles.contentView}>
              <View style={styles.welcomeView}>
                <Text style={styles.welcomeText}>CELLPHONE DOES NOT MATCH YOUR CURRENT RECORDS.</Text>
                <Image source={BottomLine} style={styles.logoImage} />
              </View>
              <Text style={styles.explain}>PLEASE UPDATE YOUR CELLPHONE NUMBER ON OUR WEBSITE AT</Text>
              <CustomButton
                src={Button1}
                text="hubcapital.com.br"
                backgroundColor={Color.trans}
                color={Color.white}
                onPress={this.onSendLink.bind(this)}
                style={styles.button}
                buttonWidth={dynamicSize(200)}
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
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dynamicSize(30)
  },
  welcomeView: {
    alignItems: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    color: Color.white,
    fontSize: getFontSize(20),
    marginBottom: dynamicSize(8)
  },
  logoImage: {
    alignItems: 'center',
    height: dynamicSize(4),
    width: dynamicSize(55),
    marginBottom: dynamicSize(10)
  },
  explain: {
    textAlign: 'center',
    fontSize: getFontSize(27),
    color: Color.white,
    paddingHorizontal: dynamicSize(5),
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: getFontSize(16),
    color: Color.text,
    marginBottom: dynamicSize(5)
  },
  button: {
    alignItems: 'center',
    marginTop: dynamicSize(10),
    marginHorizontal: dynamicSize(20)
  }
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, undefined)(WebCellPhone);
