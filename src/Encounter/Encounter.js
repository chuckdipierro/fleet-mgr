import React from 'react';
import PropType from 'prop-types';
import Tray from './Tray';
import AddModal from './AddModal';

import './Encounter.scss';

const Encounter = ({
  addEnemyShip,
  addFriendlyShip,
  enemy,
  flotilla,
  rebels,
  shipList,
  weaponList,
}) => {
  return (
    <div className="Encounter">
      <Tray ships={rebels} targets={enemy} />
      <div className="btn-tray">
        <AddModal
          addShip={ship => addFriendlyShip(ship)}
          btnTxt="^ Select Friendly"
          hdrTxt="Add Ally Ship"
          shipList={flotilla}
        />
        <AddModal
          addShip={ship => addEnemyShip(ship)}
          btnTxt="Select Opposition v"
          hdrTxt="Add Enemy Ship"
          shipList={shipList}
          title
          weaponList={weaponList}
        />
      </div>
      <Tray ships={enemy} targets={rebels} />
    </div>
  );
};
Encounter.propTypes = {
  addEnemyShip: PropType.func.isRequired,
  addFriendlyShip: PropType.func.isRequired,
  enemy: PropType.array.isRequired,
  flotilla: PropType.array.isRequired,
  rebels: PropType.array.isRequired,
  shipList: PropType.array.isRequired,
  weaponList: PropType.array.isRequired,
};
export default Encounter;
