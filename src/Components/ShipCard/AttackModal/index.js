import React, { useState } from 'react';
import PropType from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';

import './AttackModal.scss';
import DefenseMap from '../../DefenseMap';
import SelectTarget from './SelectTarget';
import SelectFacing from './SelectFacing';
import SelectWeapons from './SelectWeapons';
import SelectProficiency from './SelectProficiency';
import RollResults from './RollResults';

const AttackModal = ({ ship, targets }) => {
  const [state, setState] = useState({
    agility: 0,
    aim: false,
    crew: 0,
    facing: '',
    open: false,
    step: 0,
    target: {},
    targetZone: '',
    validWeapons: [],
  });

  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };

  const handleSelection = i => {
    let newValidWeapons = [].concat(...state.validWeapons);
    newValidWeapons[i].selected = !!!newValidWeapons[i].selected;
    updateState({ validWeapons: newValidWeapons });
  };

  const validateWeapons = facing => {
    const validWeaponList = [];
    ship.Weapons.forEach(weapon => {
      if (
        weapon.position === facing ||
        (weapon.mount.indexOf('turret') > -1 &&
          !(facing === 'aft' && weapon.position === 'forward') &&
          !(facing === 'forward' && weapon.position === 'aft') &&
          !(facing === 'port' && weapon.position === 'starboard') &&
          !(facing === 'starboard' && weapon.position === 'port') &&
          !(facing === 'aft' && weapon.position === 'dorsal') &&
          !(facing === 'aft' && weapon.position === 'ventral') &&
          !(facing === 'dorsal' && weapon.position === 'ventral') &&
          !(facing === 'ventral' && weapon.position === 'dorsal'))
      ) {
        validWeaponList.push(weapon);
      }
    });
    return validWeaponList;
  };
  let attackStep = {};
  const zones = ['forward', 'port', 'starboard', 'aft', 'dorsal', 'ventral', 'hull'];
  const shipOptions = targets.map((ship, i) => {
    return {
      key: i,
      text: `${ship.Class} Class ${ship.hullType}`,
      value: i,
    };
  });
  switch (state.step) {
    case 0:
      attackStep = (
        <SelectTarget
          shipOptions={shipOptions}
          setTarget={i => updateState({ target: targets[i], step: (state.step += 1) })}
        />
      );
      break;
    case 1:
      attackStep = (
        <DefenseMap
          fore={state.target.defFore}
          aft={state.target.defAft}
          port={state.target.defPort}
          starboard={state.target.defStarboard}
          selectZone={zone => updateState({ targetZone: zone, step: (state.step += 1) })}
        />
      );
      break;
    case 2:
      attackStep = (
        <SelectFacing
          zones={zones}
          setFacing={facing =>
            updateState({ facing, step: (state.step += 1), validWeapons: validateWeapons(facing) })
          }
        />
      );
      break;
    case 3:
      attackStep = (
        <div>
          <SelectWeapons
            facing={state.facing}
            handleSelection={i => handleSelection(i)}
            validWeapons={state.validWeapons}
          />
          <Button onClick={() => updateState({ step: (state.step += 1) })}>Fire Weapons</Button>
        </div>
      );
      break;
    case 4:
      attackStep = (
        <SelectProficiency
          confirmSelections={(agility, aim, crew) =>
            updateState({ agility, aim, crew, step: (state.step += 1) })
          }
        />
      );
      break;
    case 5:
      attackStep = <RollResults {...state} ship={ship} />;
      break;
    default:
      attackStep = <div>Error</div>;
  }
  return (
    <Modal
      size="tiny"
      className="AttackModal"
      open={state.open}
      onClose={() => updateState({ open: false })}
      trigger={
        <Button
          basic
          circular
          color="red"
          icon="fire"
          onClick={() => updateState({ open: true })}
        />
      }
    >
      <Modal.Header>Attack an Opposing Ship</Modal.Header>
      <Modal.Content>
        <Modal.Description>{attackStep}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            if (state.step > 0) updateState({ step: (state.step -= 1) });
          }}
        >
          Back
        </Button>
        <Button
          negative
          onClick={() => {
            if (state.step > 0) updateState({ open: false });
          }}
        >
          Cancel Attack
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
AttackModal.propTypes = {
  ship: PropType.object.isRequired,
  targets: PropType.array.isRequired,
};
export default AttackModal;
