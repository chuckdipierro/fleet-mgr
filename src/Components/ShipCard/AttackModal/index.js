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

const AttackModal = ({ applyDamage, ship, targets, turn }) => {
  const baseState = {
    agility: 0,
    aim: false,
    boost: 0,
    challenge: 0,
    crew: 0,
    diffMod: 0,
    facing: '',
    open: false,
    prof: 0,
    selectedCount: 0,
    setback: 0,
    step: 0,
    target: {},
    targetZone: '',
    validWeapons: [],
    weaponType: '',
  };
  const [state, setState] = useState(baseState);

  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };

  const handleSelection = i => {
    const newValidWeapons = [].concat(...state.validWeapons);
    let { selectedCount } = state;
    newValidWeapons[i].selected = !newValidWeapons[i].selected;
    let weaponType = '';
    if (newValidWeapons[i].selected) {
      selectedCount += 1;
      weaponType = newValidWeapons[i].type;
    } else if (selectedCount > 0) {
      selectedCount -= 1;
    }
    if (state.weaponType.length > 0 && selectedCount === 0) {
      weaponType = '';
    }
    updateState({ selectedCount, weaponType, validWeapons: newValidWeapons });
  };

  const validateWeapons = facing => {
    const validWeaponList = [];
    ship.Weapons.forEach((weapon, i) => {
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
        weapon.selected = false;
        weapon.Index = i;
        console.log('Ship: ', ship);
        weapon.cooldown =
          ship.weaponsFired !== undefined &&
          !Object.keys(ship.weaponsFired).length < 1 &&
          ship.weaponsFired[i] > turn;
        // if (weapon.stats.Qualities.indexOf('Slow-Firing') > -1) {
        //   const slowFiring = parseInt(weapon.stats.Qualities.split('Slow-Firing')[1].split(',')[0]);
        //   if (turn < weapon.fired + slowFiring) {
        //     weapon.disabled = true;
        //   } else {
        //     weapon.disabled = false;
        //   }
        // }
        validWeaponList.push(weapon);
      }
    });
    return validWeaponList;
  };
  let attackStep = {};
  const zones = ['forward', 'port', 'starboard', 'aft', 'dorsal', 'ventral', 'hull'];
  const shipOptions = targets
    // .filter(ship => {
    //   return ship.currHT > 0 && ship.currSS > 0;
    // })
    .map((ship, i) => {
      return {
        key: i,
        disabled: ship.currHT === 0 || ship.currSS === 0,
        text: `${ship.Name} - ${ship.Class} Class ${ship.hullType}`,
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
      console.log('Target: ', state.target);
      attackStep = (
        <DefenseMap
          fore={state.target.defFore + state.target.defForeMod}
          aft={state.target.defAft + state.target.defAftMod}
          port={state.target.defPort + state.target.defPortMod}
          starboard={state.target.defStarboard + state.target.defStarboardMod}
          selectZone={zone =>
            updateState({ targetZone: zone, step: (state.step += 1), weaponType: '' })
          }
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
            selectedCount={state.selectedCount}
            validWeapons={state.validWeapons}
            weaponType={state.weaponType}
          />
          <Button onClick={() => updateState({ step: (state.step += 1) })}>Fire Weapons</Button>
        </div>
      );
      break;
    case 4:
      attackStep = (
        <SelectProficiency
          confirmSelections={selections => {
            updateState({ ...selections, step: (state.step += 1) });
          }}
        />
      );
      break;
    case 5:
      attackStep = (
        <RollResults
          {...state}
          ship={ship}
          applyDamage={(target, dam, strain, crit, fired) => {
            applyDamage(ship.id, target, dam, strain, crit, fired);
            updateState(baseState);
          }}
        />
      );
      break;
    default:
      attackStep = <div>Error</div>;
  }
  return (
    <Modal
      size="small"
      className="AttackModal"
      open={state.open}
      onClose={() => updateState(baseState)}
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
            if (state.step > 0) updateState(baseState);
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
