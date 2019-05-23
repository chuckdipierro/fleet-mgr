const vehicleCritTable = int => {
  console.log('Crit Roll: ', int);
  if (int < 10)
    return {
      difficulty: 1,
      name: 'Mechanical Stress',
      desc: 'Ship or vehicle suffers 1 system strain.',
    };
  if (int < 19)
    return {
      difficulty: 1,
      name: 'Jostled',
      desc: 'All crew members suffer 1 strain.',
    };
  if (int < 28)
    return {
      difficulty: 1,
      name: 'Losing Power to Shields',
      desc:
        'Decrease defense in affected defense zone by 1 until repaired. If ship or vehicle has no defense, suffer 1 system strain.',
    };
  if (int < 37)
    return {
      difficulty: 1,
      name: 'Knocked Off Course',
      desc:
        'On next turn, pilot cannot execute any maneuvers. Instead, must make a Piloting check to regain bearings and resume course. Difficulty depends on current speed',
    };
  if (int < 46)
    return {
      difficulty: 1,
      name: 'Tailspin',
      desc: 'All firing from ship or vehicle suffers 2 Setbacks until end of pilot’s next turn.',
    };
  if (int < 55)
    return {
      difficulty: 1,
      name: 'Component Hit',
      desc:
        'Component from Small Ship Components or Large Ship Components (see tables below) is rendered inoperable until end of next round.',
    };
  if (int < 64)
    return {
      difficulty: 2,
      name: 'Shields Failing ',
      desc:
        'Decrease defense in all defense zones by 1 until repaired. If ship or vehicle has no defense, suffer 2 system strain.',
    };
  if (int < 73)
    return {
      difficulty: 2,
      name: 'Hyperdrive or Navicomputer Failure',
      desc:
        'Cannot make any jump to hyperspace until repaired. If ship or vehicle has no hyperdrive, navigation systems fail leaving it unable to tell where it is or is going',
    };
  if (int < 82)
    return {
      difficulty: 2,
      name: 'Power Fluctuations',
      desc: 'Pilot cannot voluntarily inflict system strain on the ship until repaired.',
    };
  if (int < 91)
    return {
      difficulty: 2,
      name: 'Shields Down',
      desc:
        'Decrease defense in affected defense zone to 0 and all other defense zones by 1 point until repaired. If ship or vehicle has no defense, suffer 4 system strain.',
    };
  if (int < 100)
    return {
      difficulty: 2,
      name: 'Engine Damaged',
      desc: 'Ship or vehicle ’s maximum speed reduced by 1, to a minimum of 1, until repaired.',
    };
  if (int < 109)
    return {
      difficulty: 2,
      name: 'Shield Overload',
      desc:
        'Decrease defense in all defense zones to 0 until repaired. In addition, suffer 2 system strain. Cannot be repaired until end of encounter. If ship or vehicle has no defense, reduce armor by 1 until repaired.',
    };
  if (int < 118)
    return {
      difficulty: 3,
      name: 'Engines Down',
      desc:
        'Ship or vehicle’s maximum speed reduced to 0. In addition, ship or vehicle cannot execute  maneuvers until repaired. Ship continues on course at current speed and cannot be stopped or course changed until repaired.',
    };
  if (int < 127)
    return {
      difficulty: 3,
      name: 'Major System Failure',
      desc:
        'Component from Small Ship Components or Large Ship Components (see tables below) is rendered inoperable until repaired.',
    };
  if (int < 134)
    return {
      difficulty: 3,
      name: 'Major Hull Breach',
      desc:
        'Ships and vehicles of silhouette 4 and smaller depressurize in a number of rounds equal to silhouette. Ships of silhouette 5 and larger don’t completely depressurize, but parts do (specifics at GM discretion). Ships and vehicles operating in atmosphere instead suffer a Destabilized Critical.',
    };
  if (int < 139)
    return {
      difficulty: 3,
      name: 'Destabilized',
      desc:
        'Reduce ship or vehicle’s hull trauma threshold and system strain threshold to half original values until repaired',
    };
  if (int < 145)
    return {
      difficulty: 3,
      name: 'Fire!',
      desc:
        'Fire rages through ship or vehicle and it immediately takes 2 system strain. Fire can be extinguished with appropriate skill, Vigilance or Cool checks at GM’s discretion. Takes one round per two silhouette to put out.',
    };
  if (int < 154)
    return {
      difficulty: 3,
      name: 'Breaking Up',
      desc:
        'At the end of next round, ship is completely destroyed. Anyone aboard has one round to reach escape pod or bail out before they are lost.',
    };
  if (int >= 154)
    return {
      difficulty: 3,
      name: 'Vaporized',
      desc:
        'The ship or vehicle is completely destroyed, consumed in a large and dramatic fireball. Nothing survives.',
    };
};
export default vehicleCritTable;
