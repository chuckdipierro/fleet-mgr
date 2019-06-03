import { combineReducers } from 'redux';
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
  resources,
  shiplist,
  weapons,
});

export default fleetManager;
