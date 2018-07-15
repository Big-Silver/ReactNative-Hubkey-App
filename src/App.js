import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { YellowBox } from 'react-native';
import ReduxThunk from 'redux-thunk';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import reducers from './reducers';
import Container from './containers';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};
const persistedReducer = persistReducer(persistConfig, reducers);
const reduxMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.navigation,
);
const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk, reduxMiddleware));
const persistor = persistStore(store);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export const addListener = createReduxBoundAddListener('root');

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container />          
        </PersistGate>
      </Provider>
    );
  }
}
