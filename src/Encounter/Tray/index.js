import React from 'react';
import PropType from 'prop-types';
import ShipCard from '../../Components/ShipCard';

import './Tray.scss';

const Tray = ({ applyDamage, repairDamage, ships, targets, turn }) => {
  const shipHTML = ships.map((ship, i) => {
    return (
      <ShipCard
        applyDamage={(id, target, damage, strain, crit, fired) =>
          applyDamage(id, target, damage, strain, crit, fired, ship)
        }
        key={i}
        {...ship}
        repairDamage={repairDamage}
        ship={ship}
        status={ship.curr_HT > ship.HT / 2 ? 'green' : 'red'}
        targets={targets}
        turn={turn}
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
