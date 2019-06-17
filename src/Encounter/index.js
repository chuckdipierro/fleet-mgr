import { connect } from 'react-redux';
import { Chance } from 'chance';
import Encounter from './Encounter';
import vehicleCritTable from '../utils/vehicleCritTable';
import {
  addFriendlyShip,
  addEnemyShip,
  clearEncounter,
  clearRound,
  setFleetShip,
  setShipActed,
  updateEnemy,
} from '../actions';

const mapStateToProps = state => {
  // localStorage.setItem('fleet_encounter', JSON.stringify(state.encounter));
  // const rebelShips = state.encounter.rebels.map(rebel => {
  //   return state.flotilla.ships.find(ship => {
  //     if (ship.id === rebel.id) ship.acted = rebel.acted;
  //     return ship.id === rebel.id;
  //   });
  // });

  return {
    enemy: state.encounter.enemy,
    fetchComplete: state.app.fetchComplete,
    flotilla: state.flotilla.ships,
    encounterID: state.encounter.id,
    rebels: state.flotilla.ships.length === 0 ? [] : [],
    shipList: state.shiplist.shiplist,
    turn: state.encounter.turn,
    weaponList: state.weapons.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addEnemyShip: (ship, id, list) => {
      // const shipWithId = ship;
      // shipWithId.id = Math.floor(Math.random() * 1000000);
      dispatch(addEnemyShip(ship, id, list));
    },
    addFriendlyShip: ship => {
      dispatch(addFriendlyShip(ship.id));
    },
    applyDamage: (shipID, target, damage, strain, crit, fired, turn, shipFiring, enemy = false) => {
      const critHit = crit > 0;
      console.log('Crit test, ', critHit);
      const targetUpdate = Object.assign({}, target, {
        currHT: target.currHT - damage >= 0 ? target.currHT - damage : 0,
        currSS: target.currSS - strain >= 0 ? target.currSS - strain : 0,
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
      fired.forEach(index => {
        if (shipFiring.Weapons[index].stats.Qualities.indexOf('Slow-Firing') > -1) {
          const slowFiring = parseInt(
            shipFiring.Weapons[index].stats.Qualities.split('Slow-Firing')[1].split(',')[0]
          );
          shipFiring.Weapons[index].cooldown = turn + slowFiring;
        }
      });
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
          dispatch(updateEnemy(target.id, targetUpdate));
        } else {
          dispatch(setFleetShip(target._id, targetUpdate));
        }
      }
      dispatch(setShipActed(enemy, shipID, shipFiring));
    },
    clearEncounter: () => {
      dispatch(clearEncounter());
    },
    clearRound: () => {
      dispatch(clearRound());
    },
    repairDamage: (target, hull, strain, crits, enemy = false) => {
      const targetUpdate = Object.assign({}, target, {
        currHT:
          target.currHT + parseInt(hull) > target.HT ? target.HT : target.currHT + parseInt(hull),
        currSS:
          target.currSS + parseInt(strain) > target.SS
            ? target.SS
            : target.currSS + parseInt(strain),
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
        dispatch(updateEnemy(target.id, targetUpdate));
      } else {
        dispatch(setFleetShip(target._id, targetUpdate));
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
        dispatch(updateEnemy(target.id, targetUpdate));
      } else {
        dispatch(setFleetShip(target._id, targetUpdate));
      }
    },
  };
};

const EncounterConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(Encounter);

export default EncounterConnector;
