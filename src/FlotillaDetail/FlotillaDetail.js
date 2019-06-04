import React from 'react';
import PropType from 'prop-types';
import AddShipConnector from './AddShip';
import ShipCard from '../Components/ShipCard';

import './FlotillaDetail.scss';

const FlotillaDetail = ({ flotilla, repairDamage, updateDefense }) => {
  const ShipList = flotilla.map((ship, i) => {
    let status = 'green';
    if (ship.curr_HT < ship.HT) {
      status = 'yellow';
    } else if (ship.curr_HT <= ship.HT / 2) {
      status = 'red';
    } else if (ship.HT <= 0) {
      status = 'grey';
    }
    return (
      <ShipCard
        key={i}
        {...ship}
        status={status}
        ship={ship}
        repairDamage={repairDamage}
        updateDefense={updateDefense}
      />
    );
  });
  return (
    <div className="FlotillaDetail">
      <AddShipConnector />
      <div className="ShipContainer">{ShipList}</div>
    </div>
  );
};
FlotillaDetail.propTypes = {
  flotilla: PropType.array.isRequired,
};
export default FlotillaDetail;
