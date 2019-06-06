import React from 'react';
import PropType from 'prop-types';
import AddShipConnector from './AddShip';
import ShipCard from '../Components/ShipCard';

import './FlotillaDetail.scss';
import { Label } from 'semantic-ui-react';

const FlotillaDetail = ({
  flotilla,
  morale,
  ordnance,
  provisions,
  repair,
  repairDamage,
  updateDefense,
}) => {
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
      <div className="FleetStatus">
        <Label color="teal">
          Ordnance<Label.Detail>{ordnance}</Label.Detail>
        </Label>
        <Label color="teal">
          Provisions<Label.Detail>{provisions}</Label.Detail>
        </Label>
        <Label color="teal">
          Repair<Label.Detail>{repair}</Label.Detail>
        </Label>
        <Label color="teal">
          Morale<Label.Detail>{morale}</Label.Detail>
        </Label>
        <AddShipConnector />
      </div>
      <div className="ShipContainer">{ShipList}</div>
    </div>
  );
};
FlotillaDetail.propTypes = {
  flotilla: PropType.array.isRequired,
};
export default FlotillaDetail;
