import React from 'react';
import PropType from 'prop-types';
import { Button, Label, Popup } from 'semantic-ui-react';
import './Triumph.scss';

const Triumph = ({ concentrated, select, spent }) => {
  return (
    <Popup
      trigger={
        <Button color={spent ? 'yellow' : 'grey'} className="Triumph icon-btn" icon content="x" />
      }
      on="click"
      position="top right"
      flowing
      hoverable
    >
      <Popup.Header>Spend your Triumph:</Popup.Header>
      <Popup.Content>
        <Button.Group compact color="yellow">
          <Button disabled={concentrated || spent} onClick={() => select('concentrated')}>
            Concentrated Barrage
          </Button>
          <Button disabled={spent} onClick={() => select('critical')}>
            Critical Hit
          </Button>
        </Button.Group>
      </Popup.Content>
    </Popup>
  );
};
Triumph.defaultProps = {};
Triumph.propTypes = {};
export default Triumph;
