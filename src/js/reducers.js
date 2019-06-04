var store = Redux.createStore(bartData);

function bartData(state = { apiData: {} }, action) {
  switch (action.type) {
    case "BART_DATA_UPDATE":
      if (state.apiData === undefined) {
        return state;
      }
      state.apiData = action.apiData;
      return state;
    default:
      return state;
  }
}
