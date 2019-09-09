import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Input, List } from 'semantic-ui-react';
import Permissions from 'react-redux-permissions';
import PropType from 'prop-types';
import Tray from './Tray';
import AddModal from './AddModal';

import './Encounter.scss';

const Encounter = ({
  addEnemyShip,
  addFriendlyShip,
  applyDamage,
  clearEncounter,
  clearRound,
  createEncounter,
  encounterID,
  encounterList,
  enemy,
  fetchComplete,
  flotilla,
  rebels,
  repairDamage,
  selectedEncounter,
  setEncounter,
  shipList,
  turn,
  updateDefense,
  weaponList,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [encounterTitle, setEncounterTitle] = useState('');
  if (!fetchComplete) return <div>Loading</div>;
  if (redirect) return <Redirect to="/" />;
  console.log('selectedEncounter: ', selectedEncounter);
  if (selectedEncounter.length === 0)
    return (
      <div className="EncounterList">
        <h2>Encounter List:</h2>
        <List divided relaxed>
          {encounterList.map((encounter, i) => {
            return (
              <List.Item
                as="a"
                className="Encounter"
                content={encounter.title}
                icon="arrow right"
                key={i}
                onClick={() => {
                  setEncounter(encounter._id);
                }}
              />
            );
          })}
        </List>
        <Permissions allowed={['admin']}>
          <div className="create">
            <Input
              onChange={e => setEncounterTitle(e.target.value)}
              placeholder=""
              type="text"
              value={encounterTitle}
            />
            <Button
              disabled={encounterTitle.length < 2}
              primary
              onClick={() => {
                createEncounter(encounterTitle);
              }}
            >
              Create Encounter
            </Button>
          </div>
        </Permissions>
      </div>
    );
  return (
    <div className="Encounter">
      <div className="turnMgr">
        <span className="turnCnt">Round: {turn}</span>
        <Permissions allowed={['admin']}>
          <Button.Group>
            <Button primary onClick={() => clearRound(encounterID, turn)}>
              End Round
            </Button>
            <Button
              primary
              onClick={() => {
                clearEncounter(encounterID);
                setRedirect(true);
              }}
            >
              End Encounter
            </Button>
          </Button.Group>
        </Permissions>
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

      <Permissions allowed={['admin']}>
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
      </Permissions>
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
