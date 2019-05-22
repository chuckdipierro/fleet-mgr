import React from 'react';
import PropType from 'prop-types';
import WeaponList from '../../WeaponList';
import './SelectWeapons.scss';

const SelectWeapons = ({ facing, handleSelection, validWeapons, weaponType }) => {
  return (
    <div className="SelectWeapons">
      <div>{facing} weapons:</div>
      <WeaponList
        weapons={validWeapons}
        weaponType={weaponType}
        selected={i => handleSelection(i)}
      />
    </div>
  );
};
SelectWeapons.defaultProps = {};
SelectWeapons.propTypes = {
  facing: PropType.string.isRequired,
  handleSelection: PropType.func.isRequired,
  validWeapons: PropType.array.isRequired,
  weaponType: PropType.string,
};
export default SelectWeapons;
