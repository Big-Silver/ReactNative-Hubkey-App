import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth';
import MainNavigator from '../containers/AppNavigator';

const navigation = (state,action) => {
  const newState = MainNavigator.router.getStateForAction(action, state);
  return newState || state;
}

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['authReducer']
}

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  navigation
});

const rootReducer = (state, action) => {
  console.log('action: ', action.type, 'state: ', state);
  // if (action.type === 'SIGN_OUT') {
  //   Object.keys(state).forEach(key => {
  //     storage.removeItem(`persist:${key}`);
  //   });
  //   state = undefined
  // }

  return appReducer(state, action)
}

export default rootReducer;
