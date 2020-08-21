import ReactDOM from 'react-dom';
import React from 'react';
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Provider} from 'react-redux';
import {UserReducer} from './reducers/UserReducer';
import {LeadsReducer} from './reducers/LeadsReducer';
import {ViewReducer} from './reducers/ViewReducer';
import {ServicesReducer} from './reducers/ServicesReducer';
import {ContactsReducer} from './reducers/ContactsReducer';
import thunk from 'redux-thunk'

import {createStore,combineReducers,applyMiddleware,compose} from 'redux';

const reducer=combineReducers({
    users:UserReducer,
    leads:LeadsReducer,
    view:ViewReducer,
    services:ServicesReducer,
    contacts:ContactsReducer
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);
const store=createStore(reducer,enhancer);
ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>
,
document.getElementById("root"));