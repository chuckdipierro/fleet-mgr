import React from 'react';
import { Redirect, BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Permissions from 'react-redux-permissions';
import FlotillaDetailConnector from './FlotillaDetail';
import EncounterConnector from './Encounter';
import './App.css';
import ShipFormConnector from './ShipForm/ShipFormConnector';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Menu>
          <Permissions allowed={['admin']}>
            <Menu.Item>
              <Link to="/shipForm">Create Ship</Link>
            </Menu.Item>
          </Permissions>
          <Menu.Item>
            <Link to="/encounter">Encounter View</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Flotilla</Link>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path="/" render={() => <FlotillaDetailConnector />} />
          <Route exact path="/encounter" render={() => <EncounterConnector />} />
          <Route exact path="/shipForm" render={() => <ShipFormConnector />} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
