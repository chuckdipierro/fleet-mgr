const encounter = (state = { rebels: [], squadFull: false, enemy: [] }, action) => {
  switch (action.type) {
    case 'ADD_FRIENDLY_SHIP':
      return state.rebels.length < 6
        ? Object.assign({}, state, { rebels: [...state.rebels, action.ship] })
        : Object.assign({}, state, { squadFull: true });
    case 'ADD_ENEMY_SHIP':
      return Object.assign({}, state, { enemy: [...state.enemy, action.ship] });
    default:
      return state;
  }
};

export default encounter;
