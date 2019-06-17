const { REACT_APP_API_URL } = process.env;

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
export const getEncounter = () => {
  return async dispatch => {
    try {
      const response = await fetch('/api/encounter');
      const encounter = await response.json();
      if (encounter.length === 0) {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        };
        const createResponse = await fetch(`/api/encounter/`, options);
        encounter = await createResponse.json();
      }
      dispatch({
        type: 'SET_ENCOUNTER',
        encounter: {
          id: encounter._id,
          enemy: encounter.enemies,
          rebels: encounter.rebels,
          turn: encounter.turn,
        },
      });
      let ws = new WebSocket('ws://localhost:5000/websocket');

      ws.onopen = function() {
        console.log('app connected to websocket!');
      };
      ws.onmessage = function(message) {
        console.log(message);
      };
    } catch (err) {
      dispatch({
        type: 'SET_ENCOUNTER',
        id: '',
        enemy: [],
        rebels: [],
        turn: 0,
      });
    }
  };
};
export const getFlotilla = () => {
  return async dispatch => {
    try {
      const response = await fetch('/api/fleetShipList');
      let shipsAdded = await response.json();
      shipsAdded = shipsAdded.map(ship => {
        let correctedShip = ship;
        delete correctedShip.ship._id;
        correctedShip = Object.assign({}, correctedShip, { ...correctedShip.ship });
        delete correctedShip.ship;
        return correctedShip;
      });
      dispatch({
        type: 'FETCH_COMPLETE',
      });
      dispatch({
        type: 'SET_FLOTILLA',
        ships: [],
      });
      dispatch({
        type: 'SET_FLOTILLA',
        ships: shipsAdded,
      });
      dispatch({
        type: 'UPDATE_ENCOUNTER',
        ships: shipsAdded,
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
export const getResources = () => {
  return async dispatch => {
    try {
      const response = await fetch('/api/resources');
      const resources = await response.json();
      if (resources.length === 0) {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        };
        const createResponse = await fetch(`/api/resources/`, options);
        resources = await createResponse.json();
      }
      dispatch({
        type: 'SET_RESOURCES',
        id: resources._id,
        morale: resources.morale,
        ordnance: resources.ordnance,
        provisions: resources.provisions,
        repair: resources.repair,
      });
    } catch (err) {
      dispatch({
        type: 'SET_RESOURCES',
        id: '',
        morale: 0,
        ordnance: 0,
        provisions: 0,
        repair: 0,
      });
    }
  };
};
export const setFleetShip = (id, target) => {
  return async dispatch => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(target),
      };
      await fetch(`/api/updateFleetShip/${id}`, options);
      dispatch(getFlotilla());
    } catch (err) {
      dispatch(getFlotilla());
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
export const addEnemyShip = (ship, encounterID, shipList) => {
  return async dispatch => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ship),
      };
      console.log('Ship: ', ship);
      let addedShip = await fetch('/api/addEnemyShip', options);
      const newShipID = await addedShip.json();
      console.log('Added: ', newShipID);

      // return {
      //   type: 'ADD_ENEMY_SHIP',
      //   ship,
      // };

      dispatch(updateEncounter(encounterID, { enemies: [...shipList, newShipID] }));
      dispatch(getFlotilla());
    } catch {
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
  if (enemy) setFleetShip(id, ship);
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
export const spendRepair = (id, target) => {
  return async dispatch => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(target),
      };
      await fetch(`/api/resources/${id}`, options);
      dispatch(getResources());
    } catch (err) {
      dispatch(getResources());
    }
  };
};
export const updateEncounter = (id, update) => {
  return async dispatch => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      };
      console.log('Id: ', id, `/api/encounter/${id}`, update);
      const updatedEncounter = await fetch(`/api/encounter/${id}`, options);
      const encounterDetail = await updatedEncounter.json();
      console.log('EncounterDetail', encounterDetail);
      dispatch(getEncounter());
    } catch (err) {
      console.log('Err in acction: ', err);
      dispatch(getEncounter());
    }
  };
};
export const updateEnemy = (id, ship) => {
  return {
    type: 'UPDATE_ENEMY',
    id,
    ship,
  };
};
