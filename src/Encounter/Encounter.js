import React, { useEffect } from 'react';
import PropType from 'prop-types';
import Tray from './Tray';
import AddModal from './AddModal';

import './Encounter.scss';
import { Button } from 'semantic-ui-react';

const Encounter = ({
  addEnemyShip,
  addFriendlyShip,
  applyDamage,
  clearEncounter,
  clearRound,
  encounterID,
  enemy,
  fetchComplete,
  flotilla,
  rebels,
  repairDamage,
  shipList,
  turn,
  updateDefense,
  weaponList,
}) => {
  if (!fetchComplete) return <div>Loading</div>;
  return (
    <div className="Encounter">
      <div className="turnMgr">
        <span className="turnCnt">Round: {turn}</span>
        <Button.Group>
          <Button primary onClick={() => clearRound(encounterID, turn)}>
            End Round
          </Button>
          <Button primary onClick={() => clearEncounter()}>
            End Encounter
          </Button>
        </Button.Group>
      </div>
      <Tray
        applyDamage={(id, target, damage, strain, crit, fired, ship) =>
          applyDamage(id, target, damage, strain, crit, fired, turn, ship, true)
        }
        repairDamage={repairDamage}
        ships={rebels}
        targets={enemy}
        turn={turn}
        updateDefense={(target, aft, fore, port, starboard) =>
          updateDefense(target, aft, fore, port, starboard, false)
        }
      />
      <div className="btn-tray">
        <AddModal
          addShip={ship =>
            addFriendlyShip(
              ship,
              encounterID,
              rebels.map(rebel => {
                return rebel._id;
              })
            )
          }
          btnTxt="^ Select Friendly"
          hdrTxt="Add Ally Ship"
          shipList={flotilla}
        />
        <AddModal
          addShip={ship =>
            addEnemyShip(
              ship,
              encounterID,
              enemy.map(en => {
                return en._id;
              })
            )
          }
          btnTxt="Select Opposition v"
          hdrTxt="Add Enemy Ship"
          shipList={shipList}
          title
          weaponList={weaponList}
        />
      </div>
      <Tray
        applyDamage={(id, target, damage, strain, crit, fired, ship) =>
          applyDamage(id, target, damage, strain, crit, fired, turn, ship, false)
        }
        repairDamage={(target, hull, strain, crits) =>
          repairDamage(target, hull, strain, crits, true)
        }
        ships={enemy}
        targets={rebels}
        turn={turn}
        updateDefense={(target, aft, fore, port, starboard) =>
          updateDefense(target, aft, fore, port, starboard, true)
        }
      />
    </div>
  );
};
Encounter.propTypes = {
  addEnemyShip: PropType.func.isRequired,
  addFriendlyShip: PropType.func.isRequired,
  applyDamage: PropType.func.isRequired,
  enemy: PropType.array.isRequired,
  fetchComplete: PropType.bool.isRequired,
  flotilla: PropType.array.isRequired,
  rebels: PropType.array.isRequired,
  shipList: PropType.array.isRequired,
  weaponList: PropType.array.isRequired,
};
export default Encounter;
