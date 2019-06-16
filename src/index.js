import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import fleetManager from './reducers';
import {
  getEncounter,
  getFlotilla,
  getResources,
  getShiplist,
  setShipForm,
  setWeaponList,
} from './actions';
import shipForm from './API/shipForm';
import weapons from './API/weapons';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(fleetManager, composeEnhancers(applyMiddleware(ReduxThunk)));

store.dispatch(getEncounter(JSON.parse(window.localStorage.getItem('fleet_encounter'))));
store.dispatch(getFlotilla());
store.dispatch(getShiplist());
store.dispatch(getResources());
store.dispatch(setShipForm(shipForm));
store.dispatch(setWeaponList(weapons));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
