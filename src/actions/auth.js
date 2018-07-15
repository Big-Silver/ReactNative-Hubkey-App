import request from 'axios';
import { NavigationActions } from 'react-navigation'
import Querystring from 'querystring';
import {
  SIGN_USER,
  SIGN_USER_SUCCESS,
  SIGN_USER_FAILURE,
  SEND_AUTH_CODE,
  SEND_AUTH_CODE_SUCCESS,
  SEND_AUTH_CODE_FAILURE,
  SIGN_OUT,
} from './types';
import { apiHost } from '../constants/configuration';

let http_config = {
  headers: {
    'Content-Type': 'application/json',
  }
}

export const signIn = (data, callback) => {
  // let session = {
  //   login: {
  //     'email': 'jinli1130@outlook.com',
  //     'password': 'test123'
  //   }
  // };
  let session = {
    login: {
      'email': data.email,
      'password': data.password
    }
  };
  return (dispatch, getState) => {
    request.post(`${apiHost}/api/login`, session, http_config)
    .then(response => {
      console.log('response: ', response);
      let payload = {
        email: session.login.email,
        password: session.login.password,
        previousPhone: data.phone
      }
      dispatch(signInSuccess(payload));
      if (typeof data.previousPhone === 'undefined' || data.previousPhone === data.phone) {
        dispatch(NavigationActions.navigate({ routeName: 'authorization_code' }));
      } else {
        dispatch(NavigationActions.navigate({ routeName: 'web_cellphone' }));
      }
    }).catch(err => {
      console.log('error: ', err.response);
      alert('Email or Password is not correct, please check your input');
      switch(err.response.status) {
        case 401:
          dispatch(signInFailure(err.response))
          break;
        case 409:
          // dispatch(signInFailure(err.response))
          dispatch(NavigationActions.navigate({ routeName: 'authorization_code' }));
          break;          
        case 500:
          dispatch(signInFailure(err.response))
          break;          
        default:
          dispatch(signInFailure(err.response))
          return false;
      }
    });
  }
};

export const signInSuccess = (data) => {
  return {
    type: SIGN_USER_SUCCESS,
    payload: data
  }
};

export const signInFailure = (data) => {
  return {
    type: SIGN_USER_FAILURE,
    payload: data
  }
};

export const sendAuthCode = (data) => {
  let session = {
    login: {
      "email": data.email,
      "password": data.password,
      "2fa_token": data.authCode
    }
  };

  return (dispatch, getState) => {
    request.post(`${apiHost}/api/login/confirm`, session, http_config)
    .then(response => {
      console.log('response: ', response);
      dispatch(sendAuthSuccess(response.data));
      dispatch(NavigationActions.navigate({ routeName: 'welcome_code' }));
    })
    .catch(err => {
      console.log('error: ', err.response);
      alert('Invalid Code');
      switch(err.response.status) {
        case 401:
          dispatch(signAuthFailure(err.response))
          break;         
        case 500:
          dispatch(signAuthFailure(err.response))
          break;          
        default:
          dispatch(signAuthFailure(err.response))
          return false;
      }
    });
  }
};

export const sendAuthSuccess = (data) => {
  return {
    type: SEND_AUTH_CODE_SUCCESS,
    payload: data
  }
};

export const signAuthFailure = (data) => {
  return {
    type: SEND_AUTH_CODE_FAILURE,
    payload: data
  }
};

export const signOut = () => {
  return (dispatch, getState) => {
    dispatch(NavigationActions.navigate({ routeName: 'login' }));
    dispatch({
      type: SIGN_OUT
    })
  }
};
