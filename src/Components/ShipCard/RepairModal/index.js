import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import { Button, Checkbox, Form, Input, Modal } from 'semantic-ui-react';

import './RepairModal.scss';

const RepairModal = ({ crits, repairDamage }) => {
  const [state, setState] = useState({ ht: 0, open: false, ss: 0, critSelected: [] });
  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };
  useEffect(() => {
    let critSelected = crits.map(crit => {
      return false;
    });
    updateState({ critSelected });
  }, [crits]);
  return (
    <Modal
      size="tiny"
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
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Hull Repaired:</label>
                <Input
                  onChange={e => updateState({ ht: e.target.value })}
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
                      onChange={() => {
                        let critSelected = state.critSelected;
                        critSelected[i] = !critSelected[i];
                        updateState({ critSelected });
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
          onClick={() => {
            updateState({ open: false });
            repairDamage(state.ht, state.ss, state.critSelected);
          }}
        >
          Done
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
RepairModal.defaultProps = { crits: [] };
RepairModal.propTypes = { crits: PropType.array };
export default RepairModal;
