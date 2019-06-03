import React, { useState } from 'react';
import PropType from 'prop-types';
import { Button, Input, Modal, Select } from 'semantic-ui-react';
import mapWeapons from '../../utils/mapWeapons';

import './AddShip.scss';

const AddShip = ({ addShip, shiplist, weaponList }) => {
  const [shipName, setShipName] = useState('');
  const [captain, setCaptain] = useState('');
  const [currShip, setShip] = useState({});
  const [open, setOpen] = useState(false);
  const shipOptions = shiplist.map((ship, i) => {
    return {
      key: i,
      text: `${ship.Class} Class ${ship.hullType}`,
      value: i,
    };
  });
  const submitNewShip = () => {
    const shipObj = Object.assign({}, currShip, {
      curr_HT: currShip.HT,
      curr_SS: currShip.SS,
      crits: [],
      captain,
      id: Math.floor(Math.random() * 100000000),
      Name: shipName,
      Weapons: mapWeapons(currShip.Weapons, weaponList),
    });
    addShip(shipObj);
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      size="mini"
      className="AddShip"
      trigger={
        <Button primary onClick={() => setOpen(true)}>
          Add Ship
        </Button>
      }
    >
      <Modal.Header>Choose Ship to Add</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Input
            label="Ships Captain"
            placeholder="Officer"
            value={captain}
            onChange={e => setCaptain(e.target.value)}
          />
          <Input
            label="Ship Name"
            placeholder="Name"
            value={shipName}
            onChange={e => setShipName(e.target.value)}
          />
          <Select
            placeholder="Choose a Ship"
            options={shipOptions}
            onChange={(e, { value }) => setShip(shiplist[value])}
            search
          />

          <Button
            disabled={
              Object.keys(currShip).length === 0 || shipName.length === 0 || captain.length === 0
            }
            onClick={() => submitNewShip()}
            primary
          >
            Confirm
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
AddShip.propTypes = {
  addShip: PropType.func.isRequired,
  shiplist: PropType.array.isRequired,
  weaponList: PropType.array.isRequired,
};
export default AddShip;
