import React from 'react';
import PropType from 'prop-types';

import './DefenseMap.scss';
import DefenseWidget from './DefenseWidget';

const DefenseMap = ({
  aft,
  center,
  fore,
  lowerShield,
  port,
  raiseShield,
  selectZone,
  starboard,
}) => {
  console.log(aft, fore, port, starboard);
  return (
    <div className="DefenseMap">
      <button className="fore" onClick={() => selectZone('defFore')}>
        <DefenseWidget
          center={center}
          lowerShield={() => lowerShield('fore')}
          raiseShield={() => raiseShield('fore')}
          val={fore}
        />
      </button>
      <button className="aft" onClick={() => selectZone('defAft')}>
        <DefenseWidget
          center={center}
          lowerShield={() => lowerShield('aft')}
          raiseShield={() => raiseShield('aft')}
          val={aft}
        />
      </button>
      {center !== undefined && (
        <div className="center">
          Avail: <br />
          {center}
        </div>
      )}
      <button className="port" onClick={() => selectZone('defPort')}>
        <DefenseWidget
          center={center}
          lowerShield={() => lowerShield('port')}
          raiseShield={() => raiseShield('port')}
          val={port}
        />
      </button>
      <button className="starboard" onClick={() => selectZone('defStarboard')}>
        <DefenseWidget
          center={center}
          lowerShield={() => lowerShield('starboard')}
          raiseShield={() => raiseShield('starboard')}
          val={starboard}
        />
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
