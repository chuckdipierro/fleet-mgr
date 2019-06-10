const { REACT_APP_API_URL } = process.env;

export const addEnemyShip = ship => {
  return {
    type: 'ADD_ENEMY_SHIP',
    ship,
  };
};
export const addFriendlyShip = ship => {
  return {
    type: 'ADD_FRIENDLY_SHIP',
    ship,
  };
};
export const clearEncounter = () => {
  return {
    type: 'CLEAR_ENCOUNTER',
  };
};
export const clearRound = () => {
  return {
    type: 'CLEAR_ROUND',
  };
};
export const getEncounter = encounter => {
  return {
    type: 'SET_ENCOUNTER',
    encounter: encounter || {},
  };
};
export const getFlotilla = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/flotilla`);
      const secondResponse = await fetch('/api/fleetShipList');
      const ships = await response.json();

      let shipsAdded = await secondResponse.json();
      console.log('shipsAdded: ', shipsAdded);
      shipsAdded = shipsAdded.map(ship => {
        let correctedShip = ship;
        delete correctedShip.ship._id;
        correctedShip = Object.assign({}, correctedShip, { ...correctedShip.ship });
        delete correctedShip.ship;
        return correctedShip;
      });
      console.log('ShipsAdded: ', shipsAdded);
      dispatch({
        type: 'FETCH_COMPLETE',
      });
      dispatch({
        type: 'SET_FLOTILLA',
        ships: [],
      });
      dispatch({
        type: 'SET_FLOTILLA',
        ships: ships.concat(shipsAdded),
      });
      dispatch({
        type: 'UPDATE_ENCOUNTER',
        ships: ships.concat(shipsAdded),
      });
    } catch (err) {
      dispatch({
        type: 'FETCH_COMPLETE',
      });
      dispatch({
        type: 'SET_FLOTILLA',
        ships: [],
      });
    }
  };
};
export const setHull = (id, target) => {
  return async dispatch => {
    try {
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(target),
      };
      await fetch(`${REACT_APP_API_URL}/flotilla/${id}/`, options);
      dispatch(getFlotilla());
    } catch (err) {
      dispatch(getFlotilla());
    }
  };
};
export const addShiptoFlotilla = ship => {
  return async dispatch => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ship),
      };

      await fetch('/api/addFleetShip', options);
      dispatch(getFlotilla());
    } catch {
      dispatch(getFlotilla());
    }
  };
};
export const addShipType = ship => {
  return async dispatch => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ship),
      };
      await fetch(`${REACT_APP_API_URL}/shiplist/`, options);
      dispatch(getShiplist());
    } catch {
      dispatch(getShiplist());
    }
  };
};
export const getShiplist = () => {
  return async dispatch => {
    try {
      const response = await fetch('/api/shipList');
      const shiplist = await response.json();
      dispatch({
        type: 'SET_SHIPLIST',
        shiplist: shiplist.shipList,
      });
    } catch (err) {
      dispatch({
        type: 'SET_SHIPLIST',
        shiplist: [],
      });
    }
  };
};
export const setShipActed = (enemy, id, ship) => {
  if (enemy) setHull(ship);
  return {
    type: 'SET_SHIP_ACTED',
    enemy,
    id,
    ship,
  };
};
export const setShipForm = shipForm => {
  return {
    type: 'SET_SHIP_FORM',
    shipForm,
  };
};
export const setWeaponList = weapons => {
  return {
    type: 'SET_WEAPON_LIST',
    weapons,
  };
};
export const spendRepair = cost => {
  return {
    type: 'SPEND_REPAIR',
    cost,
  };
};
export const updateEnemy = (id, ship) => {
  return {
    type: 'UPDATE_ENEMY',
    id,
    ship,
  };
};
