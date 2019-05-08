const flotilla = (state = { ships: [] }, action) => {
  switch (action.type) {
    case 'SET_FLOTILLA':
      return Object.assign({}, state, { ships: action.ships });
    default:
      return state;
  }
};

export default flotilla;
