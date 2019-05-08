import React from 'react';
import PropType from 'prop-types';
import WeaponList from '../../WeaponList';
import './SelectWeapons.scss';

const SelectWeapons = ({ facing, handleSelection, validWeapons }) => {
  console.log(facing, handleSelection, validWeapons);
  return (
    <div className="SelectWeapons">
      <div>{facing} weapons:</div>
      <WeaponList weapons={validWeapons} selected={i => handleSelection(i)} />
    </div>
  );
};
SelectWeapons.defaultProps = {};
SelectWeapons.propTypes = {
  facing: PropType.string.isRequired,
  handleSelection: PropType.func.isRequired,
  validWeapons: PropType.array.isRequired,
};
export default SelectWeapons;
