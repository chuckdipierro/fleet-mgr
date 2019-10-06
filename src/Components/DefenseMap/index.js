import React from 'react';
import PropType from 'prop-types';

import './DefenseMap.scss';
import IncrementWidget from '../IncrementWidget';

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
  return (
    <div className="DefenseMap">
      <button className="fore" onClick={() => selectZone('defFore')}>
        <IncrementWidget
          adjust={center !== undefined}
          lower={() => lowerShield('fore')}
          raise={() => raiseShield('fore')}
          val={fore}
        />
      </button>
      <button className="aft" onClick={() => selectZone('defAft')}>
        <IncrementWidget
          adjust={center !== undefined}
          lower={() => lowerShield('aft')}
          raise={() => raiseShield('aft')}
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
        <IncrementWidget
          adjust={center !== undefined}
          lower={() => lowerShield('port')}
          raise={() => raiseShield('port')}
          val={port}
        />
      </button>
      <button className="starboard" onClick={() => selectZone('defStarboard')}>
        <IncrementWidget
          adjust={center !== undefined}
          lower={() => lowerShield('starboard')}
          raise={() => raiseShield('starboard')}
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
