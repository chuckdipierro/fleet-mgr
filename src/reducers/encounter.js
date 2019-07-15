const baseState = {
  encounterList: [],
  enemy: [],
  fetching: false,
  id: '',
  rebels: [],
  selectedEncounter: '',
  squadFull: false,
  turn: 0,
};
const encounter = (state = baseState, action) => {
  switch (action.type) {
    case 'CLEAR_SELECTED_ENCOUNTER':
      return Object.assign({}, state, { selectedEncounter: '' });
    case 'SET_ENCOUNTER':
      console.log('Encounter: ', action);
      return Object.assign({}, state, { ...action.encounter });
    case 'SET_ENCOUNTER_LIST':
      return Object.assign({}, state, { encounterList: action.encounters });
    case 'SET_SELECTED_ENCOUNTER':
      return Object.assign({}, state, { selectedEncounter: action.encounterId });
    case 'UPDATE_ENCOUNTER':
      return state;
    default:
      return state;
  }
};

export default encounter;
