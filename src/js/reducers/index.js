import { combineReducers } from "redux";
import estimates from "./estimates.js";
import map from "./map.js";
import stations from "./stations.js";

export default combineReducers({
  estimates,
  map,
  stations
});
