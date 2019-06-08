const resources = (
  state = { morale: 100, ordnance: 100, provisions: 100, repair: 100 },
  action
) => {
  switch (action.type) {
    case 'SPEND_REPAIR':
      return Object.assign({}, state, { repair: state.repair - action.cost });
    default:
      return state;
  }
};
export default resources;
