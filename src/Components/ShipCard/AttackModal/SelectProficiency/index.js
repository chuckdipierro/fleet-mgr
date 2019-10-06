import React, { useState } from 'react';
import PropType from 'prop-types';

import './SelectProficiency.scss';
import { Button, Checkbox } from 'semantic-ui-react';
import IncrementWidget from '../../../IncrementWidget';

const SelectProficiency = ({ confirmSelections }) => {
  const [state, setState] = useState({
    agility: 0,
    aim: false,
    boost: 0,
    diffMod: 0,
    challenge: 0,
    crew: 0,
    prof: 0,
    setback: 0,
  });
  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };
  const crewBtns = [];
  const agiBtns = [];
  const boostBtns = [];
  const challengeBtns = [];
  const profBtns = [];
  const setbackBtns = [];
  for (let i = 1; i < 7; i++) {
    crewBtns.push(
      <Button key={i} active={i === state.crew} onClick={() => updateState({ crew: i })}>
        {i}
      </Button>
    );
    agiBtns.push(
      <Button key={i} active={i === state.agility} onClick={() => updateState({ agility: i })}>
        {i}
      </Button>
    );
    challengeBtns.push(
      <Button key={i} active={i === state.challenge} onClick={() => updateState({ challenge: i })}>
        {i}
      </Button>
    );
    profBtns.push(
      <Button key={i} active={i === state.prof} onClick={() => updateState({ prof: i })}>
        {i}
      </Button>
    );
    boostBtns.push(
      <Button key={i} active={i === state.boost} onClick={() => updateState({ boost: i })}>
        {i}
      </Button>
    );
    setbackBtns.push(
      <Button key={i} active={i === state.setback} onClick={() => updateState({ setback: i })}>
        {i}
      </Button>
    );
  }
  return (
    <div className="SelectProficiency">
      <div>
        <h4>Crew Size:</h4>
        <Button.Group>{crewBtns}</Button.Group>
      </div>
      <div>
        <h4>Agility:</h4>
        <Button.Group>{agiBtns}</Button.Group>
      </div>
      <div>
        <h4>Upgrade Ability:</h4>
        <Button.Group>{profBtns}</Button.Group>
      </div>
      <div>
        <h4>Aim:</h4>
        <Checkbox checked={state.aim} onChange={() => updateState({ aim: !state.aim })} />
      </div>
      <div>
        <h4>Add Boost:</h4>
        <Button.Group>{boostBtns}</Button.Group>
      </div>
      <div>
        <h4>Add Setbacks:</h4>
        <Button.Group>{setbackBtns}</Button.Group>
      </div>
      <div>
        <h4>Modify Difficulty:</h4>
        <IncrementWidget
          adjust={true}
          lower={() => updateState({ diffMod: state.diffMod - 1 })}
          raise={() => updateState({ diffMod: state.diffMod + 1 })}
          val={state.diffMod}
        />
      </div>
      <div>
        <h4>Upgrade Difficulty:</h4>
        <Button.Group>{challengeBtns}</Button.Group>
      </div>
      <Button onClick={() => confirmSelections(state)}>Roll Attack</Button>
    </div>
  );
};
SelectProficiency.defaultProps = {};
SelectProficiency.propTypes = {
  confirmSelections: PropType.func.isRequired,
};
export default SelectProficiency;
