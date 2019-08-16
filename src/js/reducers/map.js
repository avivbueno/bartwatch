import { mapType } from "../enums";

const mapStyleDefault = {
  size: { height: 500, width: "100%" },
  mapType: mapType.standard,
  layers: []
};

const map = (state = mapStyleDefault, action) => {
  switch (action.type) {
    case "SET_MAP_SIZE":
      return { ...state, size: Object.assign(state.size, action.size) };
    case "SET_MAP_TYPE":
      return { ...state, mapType: action.mapType };
    case "ADD_MAP_LAYER":
      return { ...state, layers: [...state.layers, action.layer] };
    case "ADD_MAP_LAYERS":
      return { ...state, layers: [...state.layers, ...action.layers] };
    default:
      return state;
  }
};

export default map;
