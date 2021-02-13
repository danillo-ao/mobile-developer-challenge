// declaration is needed to suppress ts-lint error on Window interface
declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}


import {composeWithDevTools} from 'remote-redux-devtools';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@redux/reducers';

import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root-persist',
  stateReconciler: autoMergeLevel2,
  storage: AsyncStorage,
  whitelist: ['transfers'],
};

const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk];
const compose = composeWithDevTools({ realtime: true, port: 8000 });

const reduxStore = createStore(pReducer, compose(applyMiddleware(...middleware)));
export const reduxStorePersisted = persistStore(reduxStore);
export default reduxStore;
