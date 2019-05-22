const app = (state = { fetchComplete: false }, action) => {
  switch (action.type) {
    case 'FETCH_COMPLETE':
      return { ...state, fetchComplete: true };
    default:
      return state;
  }
};
export default app;
