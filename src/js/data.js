// ============================================================================
// Action types
// ============================================================================
const UPDATE_BART_DATA = "UPDATE_BART_DATA";

// ============================================================================
// initState
// ============================================================================
const initState = {
  state: null
};

export function updateBartState(state) {
  return {
    type: SET_BART_DATA,
    payload: { state: state }
  };
}

// ============================================================================
// Actions
// ============================================================================
export function setBartState(state) {
  return dispatch => {
    dispatch(updateBartState(state));
  };
}

// ============================================================================
// Reducer
// ============================================================================
export default function bartState(state = initState, action) {
  const payload = action.apiData;

  switch (action.type) {
    case UPDATE_BART_DATA:
      return Object.assign({}, state, { apiData: payload });
    default:
      return state;
  }
}
