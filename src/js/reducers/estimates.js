//TODO: Skip this file in the review, an example for my self going forward
const estimates = (
  state = {
    isFetching: false,
    estimates: []
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_ESTIMATES":
      return { ...state, isFetching: true };
    case "RECEIVE_ESTIMATES":
      return {
        ...state,
        isFetching: false,
        estimates: action.estimates,
        updatedOn: action.lastUpdatedTime + " " + action.lastUpdatedDate
      };
    default:
      return state;
  }
};

export default estimates;
