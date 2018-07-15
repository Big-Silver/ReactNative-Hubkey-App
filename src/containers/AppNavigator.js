import React from 'react';
import {
  Platform
} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import SvgUri from 'react-native-svg-uri';
import Auth from './Auth';
import TokenCode from './Auth/TokenCode';
import TokenNotification from './Auth/TokenNotification';
import EmailSignIn from './Auth/EmailSignIn';
import WelcomeCode from './Auth/WelcomeCode';
import WebCellPhone from './Auth/WebCellPhone';
import AuthorizationCode from './Auth/AuthorizationCode';
import Transaction from './Home/Transaction';
import TransactionDetail from './Home/TransactionDetail';
import PushNotification from './PushNotification';
import TextNotification from './TextNotification';
import EmailNotification from './EmailNotification';

import { dynamicSize } from '../helpers/DynamicSize';


// const MainTabNavigator = TabNavigator(
//   {
//     activity: {
//       screen: Activity,
//       navigationOptions: {
//         tabBarLabel: 'Activity',
//         tabBarIcon: ({ tintColor }) => (
//           <Icon name="ios-home" size={35} color={tintColor} />
//         ),
//       },
//     },
//     paymentRequest: {
//       screen: PaymentRequest,
//       navigationOptions: {
//         tabBarLabel: 'Payment Request',
//         tabBarIcon: ({ tintColor }) => (
//           <Icon name="ios-cash" size={35} color={tintColor} />
//         ),
//       },
//     },
//     profile: {
//       screen: Profile,
//       navigationOptions: {
//         tabBarLabel: 'Profile',
//         tabBarIcon: ({ tintColor }) => (
//           <Icon name="ios-person" size={35} color={tintColor} />
//         ),
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: 'rgba(43, 114, 191, 1)', // Color of tab when pressed
//       inactiveTintColor: '#8E8E93', // Color of tab when not pressed
//       showLabel: true,
//       style: {
//         backgroundColor: 'white',
//         height: dynamicSize(60),
//       },
//     },
//     tabBarPosition: 'bottom',
//     tabBarComponent: TabBarBottom,
//     swipeEnabled: false
//   },
// );

const MainNavigator = StackNavigator(
  {
    login: {
      screen: Auth,
    },
    token_code: {
      screen: TokenCode
    },
    token_notification: {
      screen: TokenNotification
    },
    email_signin: {
      screen: EmailSignIn
    },
    welcome_code: {
      screen: WelcomeCode
    },
    web_cellphone: {
      screen: WebCellPhone
    },
    authorization_code: {
      screen: AuthorizationCode
    },
    transaction: {
      screen: Transaction
    },
    transaction_detail: {
      screen: TransactionDetail
    },
    pushNotifications: {
      screen: PushNotification,
    },
    textNotification: {
      screen: TextNotification,
    },
    emailNotification: {
      screen: EmailNotification,
    },
  },
);

export default MainNavigator;
