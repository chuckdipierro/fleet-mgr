import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import { Button, Checkbox, Form, Input, Modal } from 'semantic-ui-react';

import './RepairModal.scss';

const RepairModal = ({ crits, currHT, currSS, HT, repairCost, repairDamage, repair, SS }) => {
  const [state, setState] = useState({
    cost: 0,
    ht: 0,
    open: false,
    overCost: false,
    ss: 0,
    critSelected: crits.map(crit => {
      return false;
    }),
  });
  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };
  const setRepairCost = () => {
    let critCost = 0;
    let htRepair = state.ht;
    let ssRepair = state.ss;
    state.critSelected.forEach(crit => {
      critCost += crit ? 25 : 0;
    });
    if (parseInt(currHT) + parseInt(htRepair) > HT) {
      htRepair = HT - currHT;
    }
    if (parseInt(currSS) + parseInt(ssRepair) > SS) {
      ssRepair = parseInt(SS) - parseInt(currSS);
    }
    updateState({
      cost: parseInt(state.ht) + parseInt(state.ss) + parseInt(critCost),
      ht: htRepair,
      overCost: parseInt(state.ht) + parseInt(state.ss) + parseInt(critCost) > repair,
      ss: ssRepair,
    });
  };
  useEffect(() => {
    setRepairCost();
  }, [state.ht, state.ss]);
  return (
    <Modal
      size="small"
      className="RepairModal"
      open={state.open}
      onClose={() => updateState({ open: false })}
      trigger={
        <Button
          basic
          circular
          color="green"
          icon="wrench"
          onClick={() => updateState({ open: true })}
        />
      }
    >
      <Modal.Header>Repair Ship</Modal.Header>
      {state.open && (
        <Modal.Content>
          {repairCost && (
            <Modal.Description>
              <div>Repair Points: {repair}</div>
              <div>Repair Cost: {state.cost}</div>
            </Modal.Description>
          )}
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Hull Repaired:</label>
                <Input
                  onChange={e => {
                    updateState({ ht: e.target.value });
                  }}
                  placeholder="0"
                  type="number"
                  value={state.ht}
                />
              </Form.Field>
              <Form.Field>
                <label>Strain Restored:</label>
                <Input
                  onChange={e => updateState({ ss: e.target.value })}
                  placeholder="0"
                  type="number"
                  value={state.ss}
                />
              </Form.Field>
            </Form>
            <div className="CritList">
              {crits.map((crit, i) => {
                return (
                  <div key={i}>
                    <Checkbox
                      checked={state.critSelected[i]}
                      disabled={repairCost && !state.critSelected[i] && state.cost + 25 > repair}
                      onChange={() => {
                        const { critSelected } = state;
                        critSelected[i] = !critSelected[i];
                        updateState({ critSelected });
                        setRepairCost();
                      }}
                    />{' '}
                    {crit.name} - Difficulty: {crit.difficulty}
                  </div>
                );
              })}
            </div>
          </Modal.Description>
        </Modal.Content>
      )}
      <Modal.Actions>
        <Button
          disabled={state.overCost && repairCost}
          onClick={() => {
            updateState({ open: false });
            repairDamage(
              state.ht,
              state.ss,
              state.critSelected,
              repairCost && state.cost > 0 ? state.cost : 0
            );
          }}
        >
          Done
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
RepairModal.defaultProps = { crits: [], repair: -1 };
RepairModal.propTypes = { crits: PropType.array };
export default RepairModal;
