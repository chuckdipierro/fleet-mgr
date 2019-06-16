import React, { useState } from 'react';
import PropType from 'prop-types';
import { Button, Input, Modal, Select } from 'semantic-ui-react';
import mapWeapons from '../../utils/mapWeapons';

import './AddModal.scss';

const AddModal = ({ addShip, btnTxt, hdrTxt, shipList, title, weaponList }) => {
  const [currShip, setShip] = useState({});
  const [open, setOpen] = useState(false);
  const [shipName, setShipName] = useState('');

  const shipOptions = shipList.map((ship, i) => {
    return {
      key: i,
      text: `${title ? '' : `"${ship.Name}" -`} ${ship.Class} Class ${ship.hullType}`,
      value: i,
    };
  });
  const selectShip = () => {
    const ship = currShip;
    if (title) {
      ship.Name = shipName;
      ship.currHT = ship.HT;
      ship.currSS = ship.SS;
      ship.crits = [];
      ship.Weapons = mapWeapons(ship.Weapons, weaponList);
    }
    addShip(ship);
    setOpen(false);
  };
  return (
    <Modal
      size="small"
      onClose={() => setOpen(false)}
      open={open}
      className="AllyModal"
      trigger={
        <Button onClick={() => setOpen(true)} primary>
          {btnTxt}
        </Button>
      }
    >
      <Modal.Header>{hdrTxt}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {title && (
            <Input
              label="Ship Name(optional)"
              placeholder="Name"
              value={shipName}
              onChange={e => setShipName(e.target.value)}
            />
          )}
          <Select
            placeholder="Choose a Ship"
            options={shipOptions}
            onChange={(e, { value }) => setShip(shipList[value])}
            search
          />

          <Button
            disabled={Object.keys(currShip).length === 0}
            onClick={() => selectShip()}
            primary
          >
            Confirm
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
AddModal.defaultProps = {
  title: false,
  weaponList: [],
};
AddModal.propTypes = {
  addShip: PropType.func.isRequired,
  btnTxt: PropType.string.isRequired,
  hdrTxt: PropType.string.isRequired,
  shipList: PropType.array.isRequired,
  title: PropType.bool,
  weaponList: PropType.array,
};
export default AddModal;
