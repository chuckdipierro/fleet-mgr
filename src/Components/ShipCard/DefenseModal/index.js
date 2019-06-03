import React, { useState } from 'react';
import PropType from 'prop-types';
import { Button, Form, Input, Modal } from 'semantic-ui-react';

import './DefenseModal.scss';
import DefenseMap from '../../DefenseMap';

const DefenseModal = ({ defAft, defFore, defPort, defStarboard, updateDefense }) => {
  const [state, setState] = useState({
    aft: defAft,
    avail: 0,
    fore: defFore,
    open: false,
    port: defPort,
    starboard: defStarboard,
  });
  const updateState = newState => {
    setState(
      Object.assign({}, state, {
        ...newState,
      })
    );
  };
  return (
    <Modal
      size="small"
      className="DefenseModal"
      open={state.open}
      onClose={() => updateState({ open: false })}
      trigger={
        <Button
          basic
          circular
          color="blue"
          icon="shield"
          onClick={() => updateState({ open: true })}
        />
      }
    >
      <Modal.Header>Manage Shields</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <DefenseMap
            aft={state.aft}
            center={state.avail}
            lowerShield={target =>
              updateState({ avail: state.avail + 1, [target]: state[target] - 1 })
            }
            fore={state.fore}
            port={state.port}
            raiseShield={target =>
              updateState({ avail: state.avail - 1, [target]: state[target] + 1 })
            }
            selectZone={() => {}}
            starboard={state.starboard}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            updateDefense(state.aft, state.fore, state.port, state.starboard);
            updateState({ open: false });
          }}
        >
          Done
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
DefenseModal.defaultProps = {};
DefenseModal.propTypes = {};
export default DefenseModal;
