import React, { useState } from 'react';
import PropType from 'prop-types';
import { Form, List, Checkbox } from 'semantic-ui-react';

import './WeaponSelect.scss';

const WeaponSelect = ({ cancelWeapon, saveWeapon, weapons }) => {
  const [state, setState] = useState({
    count: 0,
    linked: 0,
    mount: '',
    position: '',
    weaponSelected: -1,
  });
  const options = weapons.map((weapon, i) => {
    return { key: i, text: weapon.Name, value: i };
  });
  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };
  return (
    <Form className="WeaponSelect">
      <Form.Group>
        <Form.Input
          className="quarter"
          fluid
          label="Weapon Count"
          onChange={e => updateState({ count: e.target.value })}
          placeholder="Weapon Count"
          value={state.count}
        />
        <Form.Input
          className="quarter"
          fluid
          label="Weapon Linked"
          onChange={e => updateState({ linked: e.target.value })}
          placeholder="0-3"
          value={state.linked}
        />
        <Form.Input
          className="quarter"
          fluid
          label="Weapon Mount"
          onChange={e => updateState({ mount: e.target.value })}
          placeholder="Port, Starboard, etc..."
          value={state.mount}
        />
        <Form.Input
          className="quarter"
          fluid
          label="Weapon Position"
          onChange={e => updateState({ position: e.target.value })}
          placeholder="Port, Starboard, etc..."
          value={state.position}
        />
        <Form.Select
          className="quarter"
          fluid
          label="Weapon Type"
          onChange={(e, { value }) => updateState({ weaponSelected: value })}
          options={options}
          search
          value={state.weaponSelected}
          placeholder="Please Select"
        />
        <Form.Button
          primary
          onClick={() =>
            saveWeapon({
              count: parseInt(state.count),
              linked: parseInt(state.linked),
              mount: state.mount,
              position: state.position,
              type: options[state.weaponSelected].text,
              stats: weapons[state.weaponSelected],
            })
          }
        >
          Add
        </Form.Button>
        <Form.Button onClick={() => cancelWeapon()}>Cancel</Form.Button>
      </Form.Group>
    </Form>
  );
};
WeaponSelect.propTypes = {
  selected: PropType.func,
  selectedCount: PropType.number,
  weapons: PropType.array.isRequired,
  weaponType: PropType.string,
};
export default WeaponSelect;
