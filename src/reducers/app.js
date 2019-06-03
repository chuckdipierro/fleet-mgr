const app = (state = { fetchComplete: false, shipForm: [] }, action) => {
  switch (action.type) {
    case 'FETCH_COMPLETE':
      return { ...state, fetchComplete: true };
    case 'SET_SHIP_FORM':
      return { ...state, shipForm: action.shipForm };
    default:
      return state;
  }
};
export default app;
