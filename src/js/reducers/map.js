import { mapType } from "../enums";

const mapStyleDefault = {
  size: { height: 500, width: "100%" },
  mapType: mapType.standard
};

const map = (state = mapStyleDefault, action) => {
  switch (action.type) {
    case "SET_MAP_SIZE":
      return { ...state, size: action.size };
    case "SET_MAP_TYPE":
      return { ...state, mapType: action.mapType };
    default:
      return state;
  }
};

export default map;
