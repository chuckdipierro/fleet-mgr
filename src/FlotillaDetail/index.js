import { connect } from 'react-redux';
import FlotillaDetail from './FlotillaDetail';
import { setFleetShip, spendRepair } from '../actions';

const mapStateToProps = state => {
  return {
    flotilla: state.flotilla.ships,
    id: state.resources.id,
    morale: state.resources.morale,
    ordnance: state.resources.ordnance,
    provisions: state.resources.provisions,
    repair: state.resources.repair,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    repairDamage: (target, hull, strain, crits, id, morale, ordnance, provisions, repair) => {
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
      dispatch(setFleetShip(target._id, targetUpdate));
      dispatch(spendRepair(id, { morale, ordnance, provisions, repair }));
    },
    updateDefense: (target, defAftMod, defForeMod, defPortMod, defStarboardMod) => {
      const targetUpdate = Object.assign({}, target, {
        defAftMod,
        defForeMod,
        defPortMod,
        defStarboardMod,
      });
      dispatch(setFleetShip(target._id, targetUpdate));
    },
  };
};

const FlotillaDetailConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlotillaDetail);

export default FlotillaDetailConnector;
