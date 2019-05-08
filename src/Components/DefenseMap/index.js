import React from 'react';
import PropType from 'prop-types';

import './DefenseMap.scss';

const DefenseMap = ({ fore, aft, port, selectZone, starboard }) => {
  return (
    <div className="DefenseMap">
      <button className="fore" onClick={() => selectZone('defFore')}>
        <span className="text">{fore}</span>
      </button>
      <button className="aft" onClick={() => selectZone('defAft')}>
        <span className="text">{aft}</span>
      </button>
      <button className="port" onClick={() => selectZone('defPort')}>
        <span className="text">{port}</span>
      </button>
      <button className="starboard" onClick={() => selectZone('defStarboard')}>
        <span className="text">{starboard}</span>
      </button>
    </div>
  );
};
DefenseMap.defaultProps = {
  selectZone: () => {},
};
DefenseMap.propTypes = {
  fore: PropType.number.isRequired,
  aft: PropType.number.isRequired,
  port: PropType.number.isRequired,
  selectZone: PropType.func,
  starboard: PropType.number.isRequired,
};
export default DefenseMap;
