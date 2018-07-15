import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Icon } from 'native-base';
import Permissions from 'react-native-permissions';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import { Color } from '../../constants';
import * as Service from '../../lib/Service';
import { dynamicSize, getFontSize } from '../../helpers/DynamicSize';
import CustomHeader from '../../components/header';
import CustomButton from '../../components/button';
import { Authorization, BottomLine, Button3, Button1 } from '../../constants/images';

class TransactionDetail extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
			detail: 'Lorem ipsum dolor sit amet, cu eum rebum perpetua vulputate, nec tale posse necessitatibus ne, nam illud concludaturque ne. Eu pri porro vocibus, mei nostrum prodesset ex, mei modus quaestio ne. Est alii nusquam id, sed in tantas graeci. His aeterno lucilius ei, ex salutandi vituperatoribus usu.In mel adipiscing reprimique, an sea dicit tractatos. An vix dico saepe prompta. Nec an falli movet oportere, dicant dissentiunt ne mel. Tollit dissentiunt vis ut, ne mea alia prima intellegam, paulo quaeque corpora ea cum. Vix amet cibo cu, mea ei eros appetere liberavisse. Eos ceteros recteque omittantur ad.',
			date: '25 APR 2018',
      time: '16:43:1',
      title: 'Approval of Buy 500 Lots Of PERT4',
    };
  }

  componentDidMount() {
  }

  signOut() {
    this.props.navigation.navigate('login');
  };
  
  onDetail() {
    this.props.navigation.navigate('transaction_detail');
  };

  onBack() {
    this.props.navigation.goBack();
  }

  render() {
    const { detail, date, time, title } = this.state;
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
              <Text style={styles.authorization}>TRANSACTIONS</Text>
              <Image source={BottomLine} style={styles.welcomeImage} />
            </View>
            <View style={styles.headView}>
              <Text style={styles.dateText}>{`DATE: ${date}`}</Text>
							<View style={styles.timeView}>
								<Text style={styles.timeText}>{`TIME: ${time}`}</Text>
							</View>
            </View>
            <ScrollView>
              <View style={styles.scrollView}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.detailText}>{detail}</Text>
                <CustomButton
                  src={Button1}
                  text="BACK"
                  backgroundColor={Color.trans}
                  color={Color.white}
                  onPress={this.onBack.bind(this)}
                  style={styles.backButton}
                  buttonWidth={dynamicSize(140)}
                />
              </View>
            </ScrollView>
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
    marginBottom: dynamicSize(35)
  },
  scrollView: {
    padding: dynamicSize(15),
  },
  titleText: {
    color: '#008d6c',
    fontSize: getFontSize(21),
    fontWeight: '700',
    marginBottom: dynamicSize(10),
  },
  detailText: {
    color: '#373b3c',
    fontSize: getFontSize(19)
  },
	headView: {
		padding: dynamicSize(10),
		flexDirection: 'row',
		backgroundColor: '#dddddd',
		height: dynamicSize(40),
		alignItems: 'center'
	},
	dateText: {
    color: '#373b3c',
    fontSize: getFontSize(16),
    fontWeight: '700'
	},
	timeView: {
		flex: 1,
		alignItems: 'flex-end',
	},
	timeText: {
    color: '#373b3c',
    fontSize: getFontSize(16),
    fontWeight: '700'
  },
  backButton: {
    marginTop: dynamicSize(40),
    width: dynamicSize(140),
  }
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, undefined)(TransactionDetail);
