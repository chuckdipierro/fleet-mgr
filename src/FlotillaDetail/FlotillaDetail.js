import React from 'react';
import PropType from 'prop-types';
import AddShipConnector from './AddShip';
import ShipCard from '../Components/ShipCard';

import './FlotillaDetail.scss';

const FlotillaDetail = ({ flotilla }) => {
  const ShipList = flotilla.map((ship, i) => {
    let status = 'green';
    if (ship.curr_HT < ship.HT) {
      status = 'yellow';
    } else if (ship.curr_HT <= ship.HT / 2) {
      status = 'red';
    } else if (ship.HT <= 0) {
      status = 'grey';
    }
    return <ShipCard key={i} {...ship} status={status} />;
  });
  return (
    <div className="FlotillaDetail">
      <AddShipConnector />
      {ShipList}
    </div>
  );
};
FlotillaDetail.propTypes = {
  flotilla: PropType.array.isRequired,
};
export default FlotillaDetail;
