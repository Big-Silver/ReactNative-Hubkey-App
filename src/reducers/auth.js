import storage from 'redux-persist/lib/storage'
import {
  SIGN_USER,
  SIGN_USER_SUCCESS,
  SIGN_USER_FAILURE,
  SEND_AUTH_CODE_SUCCESS,
  SEND_AUTH_CODE_FAILURE,
  SIGN_OUT
} from '../actions/types';

const initialState = {
  signed: false,
  error: false,
  errorMsg: '',
  userDetail: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case SIGN_USER:
    //   console.log('signup.')
    //   return state;
    //   break;
    case SIGN_USER_SUCCESS:
      console.log('signup is success.')
      return Object.assign({}, state, {
        signed: true,
        userDetail: action.payload,
        error: false,
        errorMsg: ''
      });
      break;
    case SIGN_USER_FAILURE:
      console.log('signup is failed.')
      return Object.assign({}, state, {
        signed: false,
        userDetail: {},
        error: true,
        errorMsg: 'Login was failed.'
      });
      break;
    case SEND_AUTH_CODE_SUCCESS:
      console.log('send auth code is success.', )
      return Object.assign({}, state, {
        signed: true,
        token: action.payload.access_token,
        expire: action.payload.expire,
        error: false,
        errorMsg: ''
      }) 
      break;
    case SEND_AUTH_CODE_FAILURE:
      console.log('send auch code is failed.')
      return Object.assign({}, state, {
        signed: true,
        error: true,
        errorMsg: payload.errors.message
      })
      break;
    case SIGN_OUT:
      Object.keys(state).forEach(key => {
        storage.removeItem(`persist:${key}`);
      });
      return initialState;
      break;
    default:
      return state;
  }
};
