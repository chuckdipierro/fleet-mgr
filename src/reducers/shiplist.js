const shiplist = (state = { shiplist: [] }, action) => {
  switch (action.type) {
    case 'SET_SHIPLIST':
      return Object.assign({}, state, { shiplist: action.shiplist });
    default:
      return state;
  }
};

export default shiplist;
