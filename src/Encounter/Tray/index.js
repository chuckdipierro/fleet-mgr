import React from 'react';
import PropType from 'prop-types';
import ShipCard from '../../Components/ShipCard';

import './Tray.scss';

const Tray = ({ applyDamage, repairDamage, ships, targets }) => {
  const shipHTML = ships.map((ship, i) => {
    return (
      <ShipCard
        applyDamage={applyDamage}
        key={i}
        {...ship}
        repairDamage={repairDamage}
        ship={ship}
        status={ship.curr_HT > ship.HT / 2 ? 'green' : 'red'}
        targets={targets}
      />
    );
  });
  return <div className="Tray">{shipHTML}</div>;
};
Tray.propTypes = {
  applyDamage: PropType.func.isRequired,
  ships: PropType.array.isRequired,
  targets: PropType.array.isRequired,
};
export default Tray;
