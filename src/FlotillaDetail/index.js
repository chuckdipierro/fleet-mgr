import { connect } from 'react-redux';
import FlotillaDetail from './FlotillaDetail';
import { setHull, spendRepair } from '../actions';

const mapStateToProps = state => {
  return {
    flotilla: state.flotilla.ships,
    morale: state.resources.morale,
    ordnance: state.resources.ordnance,
    provisions: state.resources.provisions,
    repair: state.resources.repair,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    repairDamage: (target, hull, strain, crits, cost) => {
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
      dispatch(setHull(target.id, targetUpdate));
      dispatch(spendRepair(cost));
    },
    updateDefense: (target, defAft, defFore, defPort, defStarboard, enemy = false) => {
      const targetUpdate = Object.assign({}, target, {
        defAft,
        defFore,
        defPort,
        defStarboard,
      });
      dispatch(setHull(target.id, targetUpdate));
    },
  };
};

const FlotillaDetailConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlotillaDetail);

export default FlotillaDetailConnector;
