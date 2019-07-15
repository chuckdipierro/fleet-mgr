import { combineReducers } from 'redux';
import { reducer as permissions } from 'react-redux-permissions';
import app from './app';
import encounter from './encounter';
import flotilla from './flotilla';
import resources from './resources';
import shiplist from './shiplist';
import weapons from './weapons';

const fleetManager = combineReducers({
  app,
  encounter,
  flotilla,
  permissions,
  resources,
  shiplist,
  weapons,
});

export default fleetManager;
