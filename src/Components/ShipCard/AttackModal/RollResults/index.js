import React from 'react';
import PropType from 'prop-types';
import SWD from 'star-wars-dice';

import './RollResults.scss';

const RollResults = ({ agility, aim, crew, ship, target, targetZone, validWeapons }) => {
  let proficiency = 0;
  let ability = 0;
  let difficulty = 0;
  let silDif = ship.Silhouette - target.Silhouette;
  if (agility > crew) {
    ability = agility - crew;
    proficiency = agility - ability;
  } else if (agility === crew) {
    proficiency = agility;
  } else {
    ability = crew - agility;
    proficiency = crew - ability;
  }
  if (silDif < -1) {
    difficulty = 1;
  } else if (silDif > -2 && silDif < 2) {
    difficulty = 2;
  } else if (silDif === 2) {
    difficulty = 3;
  } else if (silDif === 3) {
    difficulty = 4;
  } else if (silDif > 3) {
    difficulty = 5;
  }
  var rolls = SWD.roll({
    ability,
    difficulty,
    proficiency,
    setback: target[targetZone],
    boost: aim ? 1 : 0,
  });
  var result = SWD.totals(rolls);
  return <div className="RollResults">Roll Results</div>;
};
RollResults.defaultProps = {};
RollResults.propTypes = {};
export default RollResults;
