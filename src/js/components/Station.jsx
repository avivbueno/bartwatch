import L from "leaflet";

const Station = (lat, lng) =>
  new L.Marker(new L.LatLng(lat, lng), {
    icon: L.divIcon({
      className: "station-icon",
      iconSize: [9, 9]
    })
  });
export default Station;
