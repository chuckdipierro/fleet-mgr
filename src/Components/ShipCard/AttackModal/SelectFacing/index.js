import React from 'react';
import PropType from 'prop-types';

import './SelectFacing.scss';

const SelectFacing = ({ setFacing, zones }) => {
  const facingBtns = zones.map((facing, i) => {
    return <button className={facing} key={i} onClick={() => setFacing(facing)} />;
  });
  return (
    <div className="SelectFacing">
      <div className="chooseZone">{facingBtns}</div>
    </div>
  );
};
SelectFacing.defaultProps = {};
SelectFacing.propTypes = { setFacing: PropType.func.isRequired, zones: PropType.array.isRequired };
export default SelectFacing;
