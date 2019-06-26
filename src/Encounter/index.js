import { connect } from 'react-redux';
import { Chance } from 'chance';
import Encounter from './Encounter';
import vehicleCritTable from '../utils/vehicleCritTable';
import {
  addFriendlyShip,
  addEnemyShip,
  clearEncounter,
  clearRound,
  setEnemyShip,
  setFleetShip,
  setShipActed,
  updateEncounter,
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
    rebels: state.flotilla.ships.length === 0 ? [] : state.encounter.rebels,
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
        target.curr_HT,
        ' - ',
        damage,
        ' = ',
        target.curr_HT - damage,
        'SS - Damage: ',
        target.curr_SS - strain
      );
      const critHit = crit > 0;
      const targetUpdate = Object.assign({}, target, {
        curr_HT:
          target.curr_HT - (damage < 0 ? 0 : damage) >= 0
            ? target.curr_HT - (damage < 0 ? 0 : damage)
            : 0,
        curr_SS:
          target.curr_SS - (strain < 0 ? 0 : strain) >= 0
            ? target.curr_SS - (strain < 0 ? 0 : strain)
            : 0,
      });
      if (critHit) {
        const chance = new Chance();
        const critRoll =
          chance.integer({ min: 0, max: 100 }) + (targetUpdate.crits.length + crit - 1) * 10;
        if (critRoll > 145) {
          targetUpdate.destroyed = true;
        }
        console.log('Crit hit roll applied!');
        targetUpdate.crits.push(vehicleCritTable(critRoll));
      }
      if (targetUpdate.currHT === 0 || targetUpdate.currSS === 0) {
        const chance = new Chance();
        const critRoll = chance.integer({ min: 0, max: 100 }) + targetUpdate.crits.length * 10;
        if (critRoll > 145) {
          targetUpdate.destroyed = true;
        }
        console.log('HT || SS hits 0 applied!');
        targetUpdate.crits.push(vehicleCritTable(critRoll));
      }
      if (Object.keys(shipFiring.weaponsFired).length < 1) {
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
          dispatch(setEnemyShip(target._id, targetUpdate));
        } else {
          dispatch(setFleetShip(target._id, targetUpdate));
        }
      }
      if (enemy) {
        dispatch(setFleetShip(shipFiring._id, shipFiring));
      } else {
        dispatch(setEnemyShip(shipFiring._id, shipFiring));
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
        dispatch(setEnemyShip(target._id, targetUpdate));
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
        dispatch(setEnemyShip(target._id, targetUpdate));
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
