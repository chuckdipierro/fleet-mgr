import React, { useState } from 'react';
import PropType from 'prop-types';
import AddShipConnector from './AddShip';
import ShipCard from '../Components/ShipCard';

import './FlotillaDetail.scss';
import { Label, Select } from 'semantic-ui-react';

const FlotillaDetail = ({
  flotilla,
  morale,
  ordnance,
  provisions,
  repair,
  repairDamage,
  updateDefense,
}) => {
  const [sortedFlotilla, setSortedFlotilla] = useState([]);
  const [sorting, setSort] = useState('');
  const sortShips = (ships, value) => {
    let newSort = [...ships];
    newSort = newSort.sort(function(a, b) {
      if (value === 'damage') {
        if (a.curr_HT / a.HT > b.curr_HT / b.HT) {
          return 1;
        }
        if (a.curr_HT / a.HT < b.curr_HT / b.HT) {
          return -1;
        }
      } else {
        if (a[value] > b[value]) {
          return value === 'hullType' ? 1 : -1;
        }
        if (a[value] < b[value]) {
          return value === 'hullType' ? -1 : 1;
        }
      }
      return 0;
    });
    return newSort;
  };

  if (flotilla.length !== sortedFlotilla.length) {
    setSortedFlotilla(sortShips(flotilla, sorting));
  }

  const ShipList = sortedFlotilla.map((ship, i) => {
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
        repairPoints={repair}
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
        <Select
          placeholder="Sort by..."
          search
          selection
          options={[
            { key: 'class', value: 'hullType', text: 'Class' },
            { key: 'crits', value: 'crits', text: 'Critical Hits' },
            { key: 'damage', value: 'damage', text: 'Damage' },
            { key: 'ht', value: 'HT', text: 'Hull Trauma' },
            { key: 'sil', value: 'Silhouette', text: 'Silhoutte' },
          ]}
          onChange={(e, { value }) => {
            setSort(value);
            setSortedFlotilla(sortShips(sortedFlotilla, value));
          }}
        />
      </div>
      <div className="ShipContainer">{ShipList}</div>
    </div>
  );
};
FlotillaDetail.propTypes = {
  flotilla: PropType.array.isRequired,
};
export default FlotillaDetail;
