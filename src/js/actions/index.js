export const updateLiveTrainsFromAPI = data => ({
  type: "UPDATE_LIVE_TRAINS_FROM_API",
  apiData: data
});

export const setMapSize = size => ({
  type: "SET_MAP_SIZE",
  size: size
});
export const setMapType = mapType => ({
  type: "SET_MAP_TYPE",
  mapType: mapType.toString()
});
export const addMapLayer = layer => ({
  type: "ADD_MAP_LAYER",
  layer: layer
});
export const addMapLayers = layers => ({
  type: "ADD_MAP_LAYERS",
  layers: layers
});

export const requestStations = () => ({
  type: "REQUEST_STATIONS",
  stations: null
});
export const receiveStations = stations => ({
  type: "RECEIVE_STATIONS",
  stations: stations.root.stations.station
});
export const fetchStations = () => dispatch => {
  dispatch(requestStations());
  fetch(
    "https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y"
  )
    .then(response => response.json())
    .then(json => dispatch(receiveStations(json)));
};

export const requestEstimates = () => ({
  type: "REQUEST_ESTIMATES"
});
export const receiveEstimates = estimates => ({
  type: "RECEIVE_ESTIMATES",
  estimates: estimates.root.station,
  lastUpdatedTime: estimates.root.time,
  lastUpdatedDate: estimates.root.date
});
export const fetchEstimates = () => dispatch => {
  dispatch(requestEstimates());
  fetch(
    "https://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=MW9S-E7SL-26DU-VV8V&json=y"
  )
    .then(response => response.json())
    .then(json => dispatch(receiveEstimates(json)));
};
