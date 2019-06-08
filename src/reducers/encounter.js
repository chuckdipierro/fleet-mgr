const baseState = { rebels: [], squadFull: false, enemy: [], turn: 0 };
const encounter = (state = baseState, action) => {
  let { enemy } = state;
  let { rebels } = state;
  switch (action.type) {
    case 'ADD_FRIENDLY_SHIP':
      return state.rebels.length < 6
        ? Object.assign({}, state, { rebels: [...state.rebels, { id: action.ship, acted: false }] })
        : Object.assign({}, state, { squadFull: true });
    case 'ADD_ENEMY_SHIP':
      return Object.assign({}, state, {
        enemy: [...state.enemy, { ...JSON.parse(JSON.stringify(action.ship)), acted: false }],
      });
    case 'CLEAR_ENCOUNTER':
      return baseState;
    case 'CLEAR_ROUND':
      enemy = enemy.map(ship => {
        const clearedShip = ship;
        clearedShip.acted = false;
        return clearedShip;
      });
      rebels = rebels.map(ship => {
        const clearedShip = ship;
        clearedShip.acted = false;
        return clearedShip;
      });
      return Object.assign({}, state, { enemy, rebels, turn: state.turn + 1 });
    case 'SET_ENCOUNTER':
      return Object.assign({}, state, action.encounter);
    case 'SET_SHIP_ACTED':
      if (action.enemy) {
        const selectedShip = rebels.findIndex(ship => {
          return ship.id === action.id;
        });
        rebels[selectedShip].acted = true;
      } else {
        const selectedShip = enemy.findIndex(ship => {
          return ship.id === action.id;
        });
        enemy[selectedShip].acted = true;
        enemy[selectedShip].Weapons = JSON.parse(JSON.stringify(action.ship.Weapons));
      }
      return Object.assign({}, state, { enemy, rebels });
    case 'UPDATE_ENCOUNTER':
      return state;
    case 'UPDATE_ENEMY':
      const newShip = enemy.findIndex(ship => {
        return ship.id === action.id;
      });
      enemy[newShip] = JSON.parse(JSON.stringify(action.ship));
      return Object.assign({}, state, { enemy });
    default:
      return state;
  }
};

export default encounter;
