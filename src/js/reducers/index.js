import { combineReducers } from "redux";
import liveTrains from "./liveTrains.js";
import map from "./map.js";

export default combineReducers({
  liveTrains,
  map
});
