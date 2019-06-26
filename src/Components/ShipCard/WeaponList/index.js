import React from 'react';
import PropType from 'prop-types';
import { List, Checkbox } from 'semantic-ui-react';

import './WeaponList.scss';

const WeaponList = ({ weapons, selected, weaponType }) => {
  const weaponList = weapons.map((wpn, i) => {
    let wpnType = wpn.type.split('(');
    if (wpnType.length > 1) {
      wpnType = `${wpnType[1].split(')')[0]} ${wpnType[0].trim()}`;
    }
    return (
      <List.Item key={i}>
        <List.Content>
          <Checkbox
            checked={!!wpn.selected}
            disabled={(weaponType.length > 0 && weaponType !== wpn.type) || wpn.cooldown}
            onChange={() => selected(i)}
          />
          <List.Header as="a">{`${wpn.count} ${wpn.mount.charAt(0).toUpperCase() +
            wpn.mount.slice(1)} Mounted ${wpnType}${
            parseInt(wpn.count, 16) > 1 ? 's' : ''
          }`}</List.Header>
          <List.Description>{`${wpn.stats.Range} Range ${
            wpn.cooldown ? '- On Cooldown' : ''
          }`}</List.Description>
        </List.Content>
      </List.Item>
    );
  });
  return (
    <List divided relaxed className="WeaponList">
      {weaponList}
    </List>
  );
};
WeaponList.propTypes = {
  selected: PropType.func,
  selectedCount: PropType.number,
  weapons: PropType.array.isRequired,
  weaponType: PropType.string,
};
export default WeaponList;
