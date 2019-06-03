import React, { useState } from 'react';
import PropType from 'prop-types';
import { Button, List } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Form from '../Components/Form';
import './ShipForm.scss';
import WeaponSelect from './WeaponSelect';

const ShipForm = ({ shipForm, onAddClick, weapons }) => {
  const defaultValue = {};
  const [state, setState] = useState({
    addWeapon: false,
    errorText: {},
    redirectToMain: false,
    submitAttempt: false,
    titleText: '',
    valueHldr: {},
    Weapons: [],
  });
  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };
  if (state[shipForm[0].data] === undefined) {
    const { valueHldr } = state;

    const errorText = {};
    shipForm.forEach(val => {
      if (val.type === 'toggle') {
        valueHldr[val.data] = defaultValue[val.data] !== undefined ? defaultValue[val.data] : false;
      } else {
        valueHldr[val.data] = defaultValue[val.data] !== undefined ? defaultValue[val.data] : '';
      }
      errorText[val.data] = '';
    });
    updateState(errorText);
    updateState(valueHldr);
  }

  const handleSubmit = () => {
    const currErrors = state.errorText;
    const submissionObj = {};
    let validated = true;

    shipForm.forEach(field => {
      if (field.required && state[field.data].length < 3) {
        currErrors[field.data] = 'This field is required.';
        validated = false;
      } else {
        currErrors[field.data] = '';
        submissionObj[field.data] = state[field.data];
      }
    });
    updateState({
      errorText: currErrors,
      submitAttempt: true,
    });
    if (validated) {
      onAddClick(submissionObj);
    }
  };

  const validate = () => {
    const currErrors = state.errorText;
    shipForm.forEach(field => {
      if (field.required && state[field.data].length < 3) {
        currErrors[field.data] = 'This field is required.';
      } else {
        currErrors[field.data] = '';
      }
    });
    updateState({
      errorText: currErrors,
    });
  };

  if (state.redirectToMain) {
    return <Redirect to="/" />;
  }

  return (
    <div className="ShipForm">
      <Form
        // buttonName={buttonName}
        className="Frx"
        error={state.errorText}
        fields={shipForm}
        onSubmit={e => handleSubmit(e)}
        updateState={obj => updateState(obj)}
        values={state}
      />
      {state.addWeapon ? (
        <WeaponSelect
          cancelWeapon={() => updateState({ addWeapon: false })}
          saveWeapon={weapon => {
            updateState({ addWeapon: false, Weapons: [...state.Weapons, weapon] });
          }}
          weapons={weapons}
        />
      ) : (
        <Button onClick={() => updateState({ addWeapon: true })}>Add Weapon</Button>
      )}
      {state.Weapons.map((wpn, i) => {
        return (
          <List.Item key={i}>
            <List.Content>
              <List.Header>{`${wpn.count} ${wpn.position.charAt(0).toUpperCase() +
                wpn.position.slice(1)} ${wpn.mount.charAt(0).toUpperCase() +
                wpn.mount.slice(1)} Mounted ${wpn.type}${
                parseInt(wpn.count, 16) > 1 ? 's' : ''
              }`}</List.Header>
              <List.Description>{`${wpn.stats.Range} Range`}</List.Description>
              <Button
                icon="delete"
                onClick={() => {
                  let Weapons = JSON.parse(JSON.stringify(state.Weapons));
                  Weapons.splice(i, 1);
                  updateState({ Weapons });
                }}
              />
            </List.Content>
          </List.Item>
        );
      })}
      <Button
        onClick={() => {
          let shipObject = {};
          shipForm.forEach(val => {
            shipObject[val.data] = state[val.data];
          });
          shipObject.Weapons = state.Weapons;
          shipObject.id = Math.floor(Math.random() * 100000000);
          onAddClick(shipObject);
          updateState({ redirectToMain: true });
        }}
      >
        Create Ship Type
      </Button>
    </div>
  );
};
ShipForm.propTypes = {};
export default ShipForm;
