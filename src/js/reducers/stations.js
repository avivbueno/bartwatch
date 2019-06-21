const stations = (
  state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_STATIONS":
      return { ...state, isFetching: true };
    case "RECEIVE_STATIONS":
      return { ...state, isFetching: false, items: action.stations };
    default:
      return state;
  }
};

export default stations;
