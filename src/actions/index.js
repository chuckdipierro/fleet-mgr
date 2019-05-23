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
      const ships = await response.json();
      dispatch({
        type: 'FETCH_COMPLETE',
      });
      dispatch({
        type: 'SET_FLOTILLA',
        ships,
      });
      dispatch({
        type: 'UPDATE_ENCOUNTER',
        ships,
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
      await fetch(`${REACT_APP_API_URL}/flotilla/`, options);
      dispatch(getFlotilla());
    } catch {
      dispatch(getFlotilla());
    }
  };
};
export const getShiplist = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/shiplist`);
      const shiplist = await response.json();
      dispatch({
        type: 'SET_SHIPLIST',
        shiplist,
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
export const setWeaponList = weapons => {
  return {
    type: 'SET_WEAPON_LIST',
    weapons,
  };
};

export const updateEnemy = (id, ship) => {
  return {
    type: 'UPDATE_ENEMY',
    id,
    ship,
  };
};
