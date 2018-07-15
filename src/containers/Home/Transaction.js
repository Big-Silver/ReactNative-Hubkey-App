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
  TouchableHighlight,
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
import { Authorization, BottomLine, Button1, Button3 } from '../../constants/images';

class Transaction extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['DATE', 'TIME', 'REQUEST APPROVED', 'STATUS'],
      tableData: [
        ['25/04/2018', '16:43:1', 'Approval of Buy 500 lots of PETR4', 'Approved\n&\nConfirmed'],
        ['25/04/2018', '16:43:1', 'Approval of Buy 500 lots of PETR4', 'Approved\n&\nConfirmed'],
        ['25/04/2018', '16:43:1', 'Approval of Buy 500 lots of PETR4', 'Approved\n&\nConfirmed'],
        ['25/04/2018', '16:43:1', 'Approval of Buy 500 lots of PETR4', 'Approved\n&\nConfirmed']
      ],
      widthArr: [70, 70, 90, 90]
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
    this.props.navigation.navigate('authorization_code');
  };

  render() {
    const { tableHead, tableData, widthArr } = this.state;
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
            <ScrollView horizontal={true} style={styles.scrollView}>       
              <View>
                <View style={styles.headView}>
                  {
                    tableHead.map((head, index) => (
                      <View style={[styles.headText, index%2 && {backgroundColor: '#414547'}]} key={index}>
                        <Text style={[styles.head, {width: widthArr[index]}]} key={index}>{head}</Text> 
                      </View>
                    ))
                  }
                </View>
                <ScrollView>
                  <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  {
                    tableData.map((rowData, index) => (
                      <TouchableHighlight onPress={this.onDetail.bind(this)} key={index}>
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={widthArr}
                          style={[styles.row, index%2 && {backgroundColor: '#cacaca'}]}
                          textStyle={styles.text}
                        />
                      </TouchableHighlight>
                    ))
                  }
                  </Table>
                  <CustomButton
                    src={Button1}
                    text="BACK"
                    backgroundColor={Color.trans}
                    color={Color.white}
                    onPress={this.onBack.bind(this)}
                    style={styles.backButton}
                    buttonWidth={dynamicSize(140)}
                  />
                </ScrollView>
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
    width: null,
    height: dynamicSize(275),
  },
  content: {
    flex: 1,
  },
  inputView: {
    padding: dynamicSize(15),
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
    marginHorizontal: dynamicSize(20)
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
  headView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
  headText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008d6c',
    height: dynamicSize(40),
  },
  head: { 
    textAlign: 'center',
    color: Color.white
  },
  row: { 
    height: dynamicSize(105), 
    backgroundColor: Color.white,
    borderColor: '#C1C0B9',
  },
  text: { 
    margin: 6,
    textAlign: 'center',
    borderColor: '#C1C0B9',
  },
  scrollView: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
  backButton: {
    marginTop: dynamicSize(40),
    width: dynamicSize(140),
  },
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, undefined)(Transaction);
