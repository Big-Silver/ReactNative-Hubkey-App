import React from 'react';
import { View } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addListener } from '../App';
import { ActionCreators } from '../actions';
import MainNavigator from './AppNavigator';

class Container extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator 
          navigation={addNavigationHelpers({ 
            dispatch: this.props.dispatch,
            state: this.props.navigation,
            addListener
          })} 
        />
      </View>
    );
  }
}

const bindAction = dispatch => {
  return Object.assign({dispatch: dispatch}, bindActionCreators(ActionCreators, dispatch)); 
  // add dispatch itself to props, so available for addNavigationHelpers
};

const mapStateToProps = state => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps, bindAction)(Container);