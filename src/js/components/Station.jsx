import L from "leaflet";
class Station extends L.Marker {
  constructor(stationData) {
    super(new L.LatLng(stationData.gtfs_latitude, stationData.gtfs_longitude), {
      icon: L.divIcon({
        className: "station-icon",
        iconSize: [12, 12],
        iconColor: "blue",
        icon: {}
      })
    });
    this.popup = L.popup().setContent(
      "Station: <b>" + stationData.name + "</b>"
    );
    this.bindPopup(this.popup);
    this.data = stationData;
  }
}
export default Station;
