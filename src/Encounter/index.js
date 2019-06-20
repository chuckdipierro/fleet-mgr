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
      console.log('TargetUpdate: ', targetUpdate);
      if (targetUpdate.curr_HT === 0 || targetUpdate.curr_SS === 0) {
        const chance = new Chance();
        const critRoll = chance.integer({ min: 0, max: 100 }) + targetUpdate.crits.length * 10;
        if (critRoll > 145) {
          targetUpdate.destroyed = true;
        }
        console.log('HT || SS hits 0 applied!');
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
      console.log('Damage > 0: ', damage > 0, 'Strain > 0: ', strain > 0);
      if (enemy) {
        dispatch(updateEnemy(target.id, targetUpdate));
      } else {
        dispatch(setHull(target.id, targetUpdate));
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
        curr_HT:
          target.curr_HT + parseInt(hull) > target.HT ? target.HT : target.curr_HT + parseInt(hull),
        curr_SS:
          target.curr_SS + parseInt(strain) > target.SS
            ? target.SS
            : target.curr_SS + parseInt(strain),
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
        dispatch(setHull(target.id, targetUpdate));
      }
    },
    updateDefense: (target, defAft, defFore, defPort, defStarboard, enemy = false) => {
      const targetUpdate = Object.assign({}, target, {
        defAft,
        defFore,
        defPort,
        defStarboard,
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
