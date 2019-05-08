import { connect } from 'react-redux';
import FlotillaDetail from './FlotillaDetail';
import {} from '../actions';

const mapStateToProps = state => {
  return {
    flotilla: state.flotilla.ships,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const FlotillaDetailConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlotillaDetail);

export default FlotillaDetailConnector;
