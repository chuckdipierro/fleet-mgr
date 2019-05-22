import React, { useState } from 'react';
import PropType from 'prop-types';

import './SelectProficiency.scss';
import { Button, Checkbox } from 'semantic-ui-react';

const SelectProficiency = ({ confirmSelections }) => {
  const [state, setState] = useState({ agility: 0, aim: false, crew: 0 });
  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };
  const crewBtns = [];
  const agiBtns = [];
  for (let i = 1; i < 7; i++) {
    crewBtns.push(
      <Button key={i} active={i === state.crew} onClick={() => updateState({ crew: i })}>
        {i}
      </Button>
    );
  }

  for (let i = 1; i < 7; i++) {
    agiBtns.push(
      <Button key={i} active={i === state.agility} onClick={() => updateState({ agility: i })}>
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
        <h4>Aim:</h4>
        <Checkbox checked={state.aim} onChange={() => updateState({ aim: !state.aim })} />
      </div>

      <Button onClick={() => confirmSelections(state.agility, state.aim, state.crew)}>
        Roll Attack
      </Button>
    </div>
  );
};
SelectProficiency.defaultProps = {};
SelectProficiency.propTypes = {
  confirmSelections: PropType.func.isRequired,
};
export default SelectProficiency;
