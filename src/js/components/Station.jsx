import L from "leaflet";
import { Component } from "react";
class Station extends L.Marker {
  constructor(stationData, clickCallback, creatorObj) {
    super(new L.LatLng(stationData.gtfs_latitude, stationData.gtfs_longitude), {
      icon: L.divIcon({
        className: "station-icon",
        iconSize: [9, 9]
      })
    });
    this.popup = L.popup().setContent(
      "Station: <b>" + stationData.name + "</b>"
    );
    this.bindPopup(this.popup);
    this.data = stationData;
    if (creatorObj instanceof Component) {
      this.creatorObj = creatorObj;
    }
    if (clickCallback instanceof Function) {
      this.on("click", clickCallback);
    }
  }
}
export default Station;
