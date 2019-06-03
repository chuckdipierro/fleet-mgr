import { connect } from 'react-redux';
import FlotillaDetail from './FlotillaDetail';
import { setHull } from '../actions';

const mapStateToProps = state => {
  return {
    flotilla: state.flotilla.ships,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
      dispatch(setHull(target.id, targetUpdate));
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
