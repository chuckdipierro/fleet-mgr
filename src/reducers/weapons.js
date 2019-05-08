const weapons = (state = { list: [] }, action) => {
  switch (action.type) {
    case 'SET_WEAPON_LIST':
      return Object.assign({}, state, {
        list: action.weapons,
      });
    default:
      return state;
  }
};
export default weapons;
