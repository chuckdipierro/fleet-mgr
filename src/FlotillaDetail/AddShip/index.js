import { connect } from 'react-redux';
import AddShip from './AddShip';
import { addShiptoFlotilla } from '../../actions';

const mapStateToProps = state => {
  return {
    shiplist: state.shiplist.shiplist,
    flotillaSize: state.flotilla.ships.length,
    weaponList: state.weapons.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addShip: ship => {
      dispatch(addShiptoFlotilla(ship));
    },
  };
};

const AddShipConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddShip);

export default AddShipConnector;
