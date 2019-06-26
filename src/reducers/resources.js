const resources = (
  state = { id: '', morale: 0, ordnance: 0, provisions: 0, repair: 0 },
  action
) => {
  switch (action.type) {
    case 'SET_RESOURCES':
      return Object.assign({}, state, {
        morale: action.morale,
        ordnance: action.ordnance,
        provisions: action.provisions,
        repair: action.repair,
        id: action.id,
      });
    case 'SPEND_REPAIR':
      return Object.assign({}, state, { repair: state.repair - action.cost });
    default:
      return state;
  }
};
export default resources;
