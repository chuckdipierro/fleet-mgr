import React, { useState } from 'react';
import PropType from 'prop-types';
import { Button, Form, Input, Modal } from 'semantic-ui-react';

import './DefenseModal.scss';
import DefenseMap from '../../DefenseMap';

const DefenseModal = ({
  defAft,
  defAftMod,
  defFore,
  defForeMod,
  defPort,
  defPortMod,
  defStarboard,
  defStarboardMod,
  updateDefense,
}) => {
  const [state, setState] = useState({
    aft: defAftMod || 0,
    avail: 0,
    fore: defForeMod || 0,
    open: false,
    port: defPortMod || 0,
    starboard: defStarboardMod || 0,
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
            aft={defAft + state.aft}
            center={state.avail}
            lowerShield={target =>
              updateState({ avail: state.avail + 1, [target]: state[target] - 1 })
            }
            fore={defFore + state.fore}
            port={defPort + state.port}
            raiseShield={target =>
              updateState({ avail: state.avail - 1, [target]: state[target] + 1 })
            }
            selectZone={() => {}}
            starboard={defStarboard + state.starboard}
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
