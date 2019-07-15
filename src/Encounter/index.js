import { connect } from 'react-redux';
import { Chance } from 'chance';
import Encounter from './Encounter';
import vehicleCritTable from '../utils/vehicleCritTable';
import {
  addFriendlyShip,
  addEnemyShip,
  clearEncounter,
  clearRound,
  createEncounter,
  getEncounter,
  setActiveEncounter,
  setEnemyShip,
  setFleetShip,
  setShipActed,
  updateEncounter,
  updateEnemy,
} from '../actions';
let SELECTED_ENCOUNTER = '';
const mapStateToProps = state => {
  // localStorage.setItem('fleet_encounter', JSON.stringify(state.encounter));
  // const rebelShips = state.encounter.rebels.map(rebel => {
  //   return state.flotilla.ships.find(ship => {
  //     if (ship.id === rebel.id) ship.acted = rebel.acted;
  //     return ship.id === rebel.id;
  //   });
  // });
  if (state.encounter.selectedEncounter.length > 0)
    SELECTED_ENCOUNTER = state.encounter.selectedEncounter;
  return {
    encounterList: state.encounter.encounterList,
    enemy: state.encounter.enemy,
    fetchComplete: state.app.fetchComplete,
    flotilla: state.flotilla.ships,
    encounterID: state.encounter.id,
    rebels: state.flotilla.ships.length === 0 ? [] : state.encounter.rebels,
    selectedEncounter: state.encounter.selectedEncounter,
    shipList: state.shiplist.shiplist,
    turn: state.encounter.turn,
    weaponList: state.weapons.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addEnemyShip: (ship, id, list) => {
      dispatch(addEnemyShip(ship, id, list));
    },
    addFriendlyShip: (ship, id, list) => {
      dispatch(addFriendlyShip(ship, id, list));
    },
    applyDamage: (shipID, target, damage, strain, crit, fired, turn, shipFiring, enemy = false) => {
      console.log(
        target,
        target.currHT,
        ' - ',
        damage,
        ' = ',
        target.currHT - damage,
        'SS - Damage: ',
        target.currSS - strain
      );
      const critHit = crit > 0;
      const targetUpdate = Object.assign({}, target, {
        currHT:
          target.currHT - (damage < 0 ? 0 : damage) >= 0
            ? target.currHT - (damage < 0 ? 0 : damage)
            : 0,
        currSS:
          target.currSS - (strain < 0 ? 0 : strain) >= 0
            ? target.currSS - (strain < 0 ? 0 : strain)
            : 0,
      });
      if (critHit) {
        const chance = new Chance();
        const critRoll =
          chance.integer({ min: 0, max: 100 }) + (targetUpdate.crits.length + crit - 1) * 10;
        if (critRoll > 145) {
          targetUpdate.destroyed = true;
        }
        targetUpdate.crits.push(vehicleCritTable(critRoll));
      }
      if (targetUpdate.currHT === 0 || targetUpdate.currSS === 0) {
        const chance = new Chance();
        const critRoll = chance.integer({ min: 0, max: 100 }) + targetUpdate.crits.length * 10;
        if (critRoll > 145) {
          targetUpdate.destroyed = true;
        }
        targetUpdate.crits.push(vehicleCritTable(critRoll));
      }
      if (
        shipFiring.weaponsFired === undefined ||
        Object.keys(shipFiring.weaponsFired).length < 1
      ) {
        shipFiring.Weapons.forEach((wpn, index) => {
          shipFiring.weaponsFired[index] = 0;
        });
      }
      fired.forEach(index => {
        if (shipFiring.Weapons[index].stats.Qualities.indexOf('Slow-Firing') > -1) {
          const slowFiring = parseInt(
            shipFiring.Weapons[index].stats.Qualities.split('Slow-Firing')[1].split(',')[0]
          );
          shipFiring.weaponsFired[index] = turn + slowFiring;
        }
      });
      shipFiring.acted = true;
      // shipFiring.Weapons.forEach((weapon, i) => {
      //   if (weapon.stats.Qualities.indexOf('Slow-Firing') > -1) {
      //     const slowFiring = parseInt(weapon.stats.Qualities.split('Slow-Firing')[1].split(',')[0]);
      //     if (weapon.fired !== undefined && turn < weapon.fired + slowFiring) {
      //       shipFiring.Weapons[i].disabled = true;
      //     } else {
      //       shipFiring.Weapons[i].disabled = false;
      //     }
      //   }
      // });
      if (damage > 0 || strain > 0) {
        if (enemy) {
          dispatch(setEnemyShip(target._id, targetUpdate, SELECTED_ENCOUNTER));
        } else {
          dispatch(setFleetShip(target._id, targetUpdate, SELECTED_ENCOUNTER));
        }
      }
      if (enemy) {
        dispatch(setFleetShip(shipFiring._id, shipFiring, SELECTED_ENCOUNTER));
      } else {
        dispatch(setEnemyShip(shipFiring._id, shipFiring, SELECTED_ENCOUNTER));
      }
      // dispatch(setShipActed(enemy, shipID, shipFiring));
    },
    clearEncounter: id => {
      dispatch(clearEncounter(id));
    },
    clearRound: (id, turn) => {
      dispatch(updateEncounter(id, { turn: turn + 1 }));
      dispatch(clearRound(id));
    },
    createEncounter: title => {
      dispatch(createEncounter(title));
    },
    setEncounter: id => {
      dispatch(setActiveEncounter(id));
      dispatch(getEncounter(id));
    },
    repairDamage: (target, hull, strain, crits, enemy = false) => {
      const targetUpdate = Object.assign({}, target, {
        currHT:
          target.currHT + parseInt(hull, 0) > target.HT
            ? target.HT
            : target.currHT + parseInt(hull, 0),
        currSS:
          target.currSS + parseInt(strain, 0) > target.SS
            ? target.SS
            : target.currSS + parseInt(strain, 0),
      });
      crits.forEach((crit, i) => {
        if (crit) {
          targetUpdate.crits[i] = null;
        }
      });
      targetUpdate.crits = targetUpdate.crits.filter(item => {
        return item != null;
      });
      if (enemy) {
        dispatch(setEnemyShip(target._id, targetUpdate, SELECTED_ENCOUNTER));
      } else {
        dispatch(setFleetShip(target._id, targetUpdate, SELECTED_ENCOUNTER));
      }
    },
    updateDefense: (target, defAftMod, defForeMod, defPortMod, defStarboardMod, enemy = false) => {
      const targetUpdate = Object.assign({}, target, {
        defAftMod,
        defForeMod,
        defPortMod,
        defStarboardMod,
      });
      if (enemy) {
        dispatch(setEnemyShip(target._id, targetUpdate, SELECTED_ENCOUNTER));
      } else {
        dispatch(setFleetShip(target._id, targetUpdate, SELECTED_ENCOUNTER));
      }
    },
  };
};

const EncounterConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(Encounter);

export default EncounterConnector;
