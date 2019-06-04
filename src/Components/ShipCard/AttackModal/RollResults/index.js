import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import SWD from 'star-wars-dice';

import './RollResults.scss';
import { Button, Checkbox } from 'semantic-ui-react';
import Triumph from './Triumph';
import { __values } from 'tslib';

const RollResults = ({
  agility,
  aim,
  boost,
  applyDamage,
  challenge,
  crew,
  prof,
  setback,
  ship,
  target,
  targetZone,
  validWeapons,
}) => {
  const firedWeapons = [];
  let setBacks = 0;
  let boosts = 0;
  let linkedMax = 0;
  const baseState = {
    buys: {},
    concentrated: false,
    critical: 0,
    linked: 0,
    results: {},
    selectedWeapons: validWeapons.filter(weapon => {
      if (weapon.selected) {
        firedWeapons.push(weapon.Index);
        if (weapon.stats.Qualities.indexOf('Inaccurate') > -1) {
          setBacks = parseInt(weapon.stats.Qualities.split('Inaccurate')[1].split(',')[0]);
        }
        if (weapon.stats.Qualities.indexOf('Accurate') > -1) {
          boosts = 1;
        }
        if (weapon.linked > 0) {
          linkedMax = weapon.linked;
        }
      }
      return weapon.selected;
    }),
  };
  const [state, setState] = useState(baseState);
  setBacks += setback;
  boosts += boost;
  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };
  const updateBuys = (key, currency, cost, num) => {
    const newBuys = state.buys;
    if (
      num &&
      (newBuys[key + num] === undefined || Object.entries(newBuys[key + num]).length === 0)
    ) {
      newBuys[key + num] = { currency, cost };
    } else if (num && Object.entries(newBuys[key + num]).length > 0) {
      newBuys[key + num] = {};
    } else if (newBuys[key] && Object.entries(newBuys[key]).length > 0) {
      newBuys[key] = {};
    } else {
      newBuys[key] = { currency, cost };
    }
    return newBuys;
  };
  const selectTriumph = (type, spent) => {
    let num = null;
    const stateChange = {};
    if (type === 'concentrated') {
      stateChange.concentrated = !state.concentrated;
    } else if (type === 'critical') {
      stateChange.critical = state.critical + 1;
      num = state.critical + (spent ? 0 : 1);
    } else if (type === 'linked') {
      stateChange.linked = state.linked + 1;
      num = state.linked + (spent ? 0 : 1);
    }
    stateChange.buys = updateBuys(type, 'triumph', 1, num);
    updateState(stateChange);
  };
  const toggleConcentrated = () => {
    const stateChange = {};
    if (state.buys.concentrated && Object.keys(state.buys.concentrated).length > 0) {
      if (state.buys.concentrated.currency === 'adv') {
        stateChange.buys = updateBuys('concentrated', 'adv', 2);
      } else {
        stateChange.buys = updateBuys('concentrated', 'triumph', 1);
      }
    } else {
      stateChange.buys = updateBuys('concentrated', 'adv', 2);
    }
    stateChange.concentrated = !state.concentrated;
    updateState(stateChange);
  };
  const submitResults = () => {
    let damageNum =
      parseInt(state.selectedWeapons[0].stats.Dam) +
      state.results.success +
      (state.concentrated ? weaponCount - 1 : 0);
    let linkedDamage = 0;
    if (state.results.success === undefined) damageNum = 0;
    const weaponUsed = validWeapons.filter(weapon => weapon.selected === true)[0];
    let breach = 0;
    let ion = false;
    if (weaponUsed.stats.Qualities.indexOf('Breach') > -1) {
      breach = parseInt(weaponUsed.stats.Qualities.split('Breach ')[1].split(',')[0]);
    }
    if (weaponUsed.stats.Qualities.indexOf('Ion') > -1) {
      ion = true;
    }
    const armorSoak = target.Armor - breach > 0 ? target.Armor - breach : 0;
    linkedDamage =
      (parseInt(state.selectedWeapons[0].stats.Dam) + state.results.success - armorSoak) *
      state.linked;
    applyDamage(
      target,
      ion ? 0 : damageNum - armorSoak + linkedDamage,
      ion ? damageNum - armorSoak + linkedDamage : 0,
      state.critical,
      firedWeapons
    );
  };
  let proficiency = 0;
  let ability = 0;
  let weaponCount = 0;
  let difficulty = 0;
  let challengeDice = 0;
  const silDif = ship.Silhouette - target.Silhouette;
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
  if (difficulty > challenge) {
    let origDiff = difficulty;
    difficulty = origDiff - challenge;
    challengeDice = origDiff - difficulty;
  } else if (difficulty === challenge) {
    challengeDice = challenge;
    difficulty = 0;
  } else {
    let origDiff = difficulty;
    difficulty = challenge - origDiff;
    challengeDice = challenge - difficulty;
  }
  if (prof > 0) {
    if (ability > 0) {
      proficiency += prof > ability ? ability : prof;
      ability = ability - prof > 0 ? ability - prof : 0;
    }
    if (ability == 0) {
      ability += prof;
    }
  }
  const rolls = SWD.roll({
    ability,
    challenge: challengeDice,
    difficulty,
    proficiency,
    setback: target[targetZone] + setBacks,
    boost: (aim ? 1 : 0) + boosts,
  });
  state.selectedWeapons.forEach(weapon => {
    weaponCount += weapon.count;
  });
  const diceOptions = [];

  Object.entries(rolls).forEach(([dice, count], index) => {
    const symbolArr = [];
    for (let i = 0; i < count.length; i += 1) {
      switch (dice) {
        case 'ability':
          symbolArr.push(
            <span key={index * 100 + i * 100 + 1} style={{ color: 'green' }}>
              d
            </span>
          );
          break;
        case 'challenge':
          symbolArr.push(
            <span key={index * 100 + i * 100 + 1} style={{ color: 'red' }}>
              c
            </span>
          );
          break;
        case 'difficulty':
          symbolArr.push(
            <span key={index * 100 + i * 100 + 1} style={{ color: 'purple' }}>
              d
            </span>
          );
          break;
        case 'proficiency':
          symbolArr.push(
            <span key={index * 100 + i * 100 + 1} style={{ color: 'yellow' }}>
              c
            </span>
          );
          break;
        case 'setback':
          symbolArr.push(
            <span key={index * 100 + i * 100 + 1} style={{ color: 'black' }}>
              b
            </span>
          );
          break;
        case 'boost':
          symbolArr.push(
            <span key={index * 100 + i * 100 + 1} style={{ color: 'blue' }}>
              b
            </span>
          );
          break;
      }
    }
    diceOptions.push(
      <div key={index * 100 + 100} className="Result Segment">
        {symbolArr}
      </div>
    );
  });
  let advSpent = 0;
  let triSpent = 0;
  Object.entries(state.buys).forEach(([key, value]) => {
    if (value.currency && value.currency === 'adv') {
      advSpent = advSpent + value.cost;
    } else if (value.currency && value.currency === 'triumph') {
      triSpent = triSpent + value.cost;
    }
  });
  const diceResults = [];
  Object.entries(state.results).forEach(([resultType, count], index) => {
    const symbolArr = [];
    for (let i = 0; i < count; i += 1) {
      switch (resultType) {
        case 'advantage':
          symbolArr.push(
            <span className={i + 1 <= advSpent ? 'selected' : ''} key={index * 100 + i * 100 + 1}>
              a
            </span>
          );
          break;
        case 'despair':
          symbolArr.push(<span key={index * 100 + i * 100 + 1}>y</span>);
          break;
        case 'failure':
          symbolArr.push(<span key={index * 100 + i * 100 + 1}>f</span>);
          break;
        case 'success':
          symbolArr.push(<span key={index * 100 + i * 100 + 1}>s</span>);
          break;
        case 'threat':
          symbolArr.push(<span key={index * 100 + i * 100 + 1}>t</span>);
          break;
        case 'triumph':
          symbolArr.push(
            <Triumph
              concentrated={state.concentrated}
              key={index * 100 + i * 100 + 1}
              linkedAvail={linkedMax > 0 && state.linked < linkedMax}
              index={i}
              select={type => selectTriumph(type, i < triSpent)}
              spent={i < triSpent}
            />
          );
          break;
      }
    }
    diceResults.push(
      <div key={index * 100 + 100} className="Result Segment">
        {symbolArr}
      </div>
    );
  });
  if (Object.keys(state.results).length <= 0) {
    updateState({ results: SWD.totals(rolls) });
  }
  return (
    <div className="RollResults">
      <h4>Dice Rolled</h4>
      <div>{diceOptions}</div>
      <h4>Roll Results:</h4>
      <div>{diceResults}</div>
      <div>
        Damage:{' '}
        {state.results.success === undefined || state.results.success === 0
          ? 'None'
          : parseInt(state.selectedWeapons[0].stats.Dam) +
            state.results.success +
            (state.concentrated ? weaponCount - 1 : 0) +
            state.linked * parseInt(state.selectedWeapons[0].stats.Dam)}
      </div>
      <div>
        <Checkbox
          checked={state.concentrated}
          disabled={
            state.results.success === undefined ||
            state.results.success === 0 ||
            (state.results.advantage === undefined && !state.concentrated) ||
            (advSpent + 2 > state.results.advantage && !state.concentrated)
          }
          onChange={() => {
            toggleConcentrated();
          }}
        />
        Concentrated Barrage (2 Adv.) - Add {weaponCount - 1} Damage
      </div>
      <div>
        <Button.Group disabled={state.results.success === undefined || state.results.success === 0}>
          <Button
            disabled={
              state.results.success === undefined ||
              state.results.advantage === undefined ||
              advSpent + parseInt(state.selectedWeapons[0].stats.Crit) + target.Massive >
                state.results.advantage
            }
            icon="plus"
            onClick={() => {
              updateState({
                critical: state.critical + 1,
                buys: updateBuys(
                  'critical',
                  'adv',
                  parseInt(state.selectedWeapons[0].stats.Crit) + target.Massive,
                  state.critical + 1
                ),
              });
            }}
          />

          <div className="critNum button">{state.critical}</div>
          <Button
            disabled={state.critical === 0}
            icon="minus"
            onClick={() => {
              updateState({
                critical: state.critical - 1,
                buys: updateBuys(
                  'critical',
                  'adv',
                  parseInt(state.selectedWeapons[0].stats.Crit) + target.Massive,
                  state.critical
                ),
              });
            }}
          />
        </Button.Group>
        Critical Hit ({parseInt(state.selectedWeapons[0].stats.Crit) + target.Massive} Adv.)
      </div>
      {linkedMax > 0 && (
        <div>
          <Button.Group
            disabled={state.results.success === undefined || state.results.success === 0}
          >
            <Button
              disabled={
                state.results.success === undefined ||
                state.results.advantage === undefined ||
                advSpent + 2 > state.results.advantage ||
                state.linked === linkedMax
              }
              icon="plus"
              onClick={() => {
                updateState({
                  linked: state.linked + 1,
                  buys: updateBuys('linked', 'adv', 2, state.linked + 1),
                });
              }}
            />

            <div className="critNum button">{state.linked}</div>
            <Button
              disabled={state.linked === 0}
              icon="minus"
              onClick={() => {
                updateState({
                  linked: state.linked - 1,
                  buys: updateBuys('linked', 'adv', 2, state.linked),
                });
              }}
            />
          </Button.Group>
          Link Weapons: (2 Adv.)
        </div>
      )}
      <div>
        <Button onClick={() => submitResults()}>Submit Results</Button>
      </div>
    </div>
  );
};
RollResults.defaultProps = {};
RollResults.propTypes = {};
export default RollResults;
