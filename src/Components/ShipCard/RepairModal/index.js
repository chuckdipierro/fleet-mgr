import React, { useState } from 'react';
import PropType from 'prop-types';
import { Button, Checkbox, Form, Input, Modal } from 'semantic-ui-react';

import './RepairModal.scss';

const RepairModal = ({ crits, repairDamage }) => {
  const [state, setState] = useState({ ht: 0, open: false, ss: 0 });
  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };
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
                <p key={i}>
                  {crit.name} - Difficulty: {crit.difficulty}
                </p>
              );
            })}
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            updateState({ open: false });
            repairDamage(state.ht, state.ss);
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
