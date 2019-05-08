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
export const getFlotilla = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/flotilla`);
      const ships = await response.json();
      dispatch({
        type: 'SET_FLOTILLA',
        ships,
      });
    } catch (err) {
      dispatch({
        type: 'SET_FLOTILLA',
        ships: [],
      });
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
export const setWeaponList = weapons => {
  return {
    type: 'SET_WEAPON_LIST',
    weapons,
  };
};
