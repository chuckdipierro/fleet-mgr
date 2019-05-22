import { connect } from 'react-redux';
import { Chance } from 'chance';
import Encounter from './Encounter';
import vehicleCritTable from '../utils/vehicleCritTable';
import {
  addFriendlyShip,
  addEnemyShip,
  clearEncounter,
  clearRound,
  setHull,
  setShipActed,
  updateEnemy,
} from '../actions';

const mapStateToProps = state => {
  localStorage.setItem('fleet_encounter', JSON.stringify(state.encounter));
  const rebelShips = state.encounter.rebels.map(rebel => {
    return state.flotilla.ships.find(ship => {
      if (ship.id === rebel.id) ship.acted = rebel.acted;
      return ship.id === rebel.id;
    });
  });
  return {
    enemy: state.encounter.enemy,
    fetchComplete: state.app.fetchComplete,
    flotilla: state.flotilla.ships,
    rebels: state.flotilla.ships.length === 0 ? [] : rebelShips,
    shipList: state.shiplist.shiplist,
    turn: state.encounter.turn,
    weaponList: state.weapons.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addEnemyShip: ship => {
      const shipWithId = ship;
      shipWithId.id = Math.floor(Math.random() * 1000000);
      dispatch(addEnemyShip(shipWithId));
    },
    addFriendlyShip: ship => {
      dispatch(addFriendlyShip(ship.id));
    },
    applyDamage: (shipID, target, damage, strain, crit, enemy = false) => {
      let critHit = crit > 0;
      console.log(crit, critHit);

      const targetUpdate = Object.assign({}, target, {
        curr_HT: target.curr_HT - damage >= 0 ? target.curr_HT - damage : 0,
        curr_SS: target.curr_SS - strain >= 0 ? target.curr_SS - strain : 0,
      });
      if (critHit) {
        const chance = new Chance();
        const key = chance.integer({ min: 0, max: 100 });
        targetUpdate.crits.push(
          vehicleCritTable(key + (targetUpdate.crits.length + crit - 1) * 10)
        );
      }
      if (targetUpdate.curr_HT === 0 || targetUpdate.curr_SS === 0) {
        const chance = new Chance();
        const key = chance.integer({ min: 0, max: 100 });
        targetUpdate.crits.push(vehicleCritTable(key + targetUpdate.crits.length * 10));
      }
      if (enemy) {
        dispatch(updateEnemy(target.id, targetUpdate));
      } else {
        dispatch(setHull(target.id, targetUpdate));
      }
      dispatch(setShipActed(enemy, shipID));
    },
    clearEncounter: () => {
      dispatch(clearEncounter());
    },
    clearRound: () => {
      dispatch(clearRound());
    },
    repairDamage: (target, hull, strain, enemy = false) => {
      const targetUpdate = Object.assign({}, target, {
        curr_HT:
          target.curr_HT + parseInt(hull) > target.HT ? target.HT : target.curr_HT + parseInt(hull),
        curr_SS:
          target.curr_SS + parseInt(strain) > target.SS
            ? target.SS
            : target.curr_SS + parseInt(strain),
      });
      if (enemy) {
        dispatch(updateEnemy(target.id, targetUpdate));
      } else {
        dispatch(setHull(target.id, targetUpdate));
      }
    },
  };
};

const EncounterConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(Encounter);

export default EncounterConnector;
