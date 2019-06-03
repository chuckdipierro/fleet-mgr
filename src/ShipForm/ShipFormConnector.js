import { connect } from 'react-redux';
import ShipForm from './ShipForm';
import { addShipType } from '../actions/index';

const mapStateToProps = state => {
  return {
    shipForm: state.app.shipForm,
    weapons: state.weapons.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: ship => {
      dispatch(addShipType(ship));
    },
  };
};

const ShipFormConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipForm);

export default ShipFormConnector;
