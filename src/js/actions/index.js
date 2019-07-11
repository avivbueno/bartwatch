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
