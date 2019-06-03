import React from 'react';
import { Redirect, BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import FlotillaDetailConnector from './FlotillaDetail';
import EncounterConnector from './Encounter';
import './App.css';
import ShipFormConnector from './ShipForm/ShipFormConnector';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Link to="/shipForm">
          <Button primary>Create Ship</Button>
        </Link>
        <Link to="/encounter">
          <Button primary>Encounter View</Button>
        </Link>
        <Link to="/">
          <Button primary>Flotilla</Button>
        </Link>
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
