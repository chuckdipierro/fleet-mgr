import { connect } from 'react-redux';
import Encounter from './Encounter';
import { addFriendlyShip, addEnemyShip } from '../actions';

const mapStateToProps = state => {
  return {
    enemy: state.encounter.enemy,
    flotilla: state.flotilla.ships,
    rebels: state.encounter.rebels,
    shipList: state.shiplist.shiplist,
    weaponList: state.weapons.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addEnemyShip: ship => {
      dispatch(addEnemyShip(ship));
    },
    addFriendlyShip: ship => {
      dispatch(addFriendlyShip(ship));
    },
  };
};

const EncounterConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(Encounter);

export default EncounterConnector;
