import React, { Component } from "react";
import L from "leaflet";
import PropTypes from "prop-types";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: {},
      currentMapTileLayer: {}
    };
  }

  componentDidMount() {
    //Map setup is being called after mount because it needs the wrapper element to render first
    this.setupMap();
  }
  componentDidUpdate(prevProps) {
    //Resize update
    if (this.props.map.size != prevProps.map.size) {
      this.state.map.invalidateSize();
    }

    //Map type update
    if (this.props.map.mapType != prevProps.mapType) {
      this.setupMapTilesLayer();
    }

    //Map marker layers update
    if (this.props.map.layers != prevProps.map.layers) {
      this.loadMarkerLayers();
    }
  }

  loadMarkerLayers() {
    //Get leaflet map object from state
    const map = this.state.map;
    //Get new layers from props
    const layers = this.props.map.layers;

    //Remove all previous marker layers
    map.eachLayer(function(layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    //Add all new markers layers
    layers.map(function(layer) {
      if (layer instanceof L.Marker) {
        map.addLayer(layer);
      }
    });
  }

  setupMap() {
    //create map
    this.state.map = L.map("map");
    //setup map tile data source
    this.setupMapTilesLayer();
    //set screen center to bay area
    var sf = new L.LatLng(37.735, -122.15);
    this.state.map.setView(sf, 11);

    //this.drawStations();
  }
  setupMapTilesLayer() {
    //Getting map style data from the props
    let map = this.props.map;
    //removing previous map tile layer
    if (this.state.map != undefined)
      this.state.map.removeLayer(this.state.currentMapTileLayer);

    //creating a new map tile layer wit tile server url (google maps)
    var layer = new L.TileLayer(
      "https://mt1.google.com/vt/lyrs=" +
        map.mapType +
        ",transit|vm:1&hl=en&opts=r&x={x}&y={y}&z={z}",
      {
        attribution: "Map data &copy;2019 Google"
      }
    );

    //adding the new map tile layer to the map
    this.state.map.addLayer(layer);

    //setting the current map tile layer to the new layer
    this.state.currentMapTileLayer = layer;
    //FYI: I think its better to have an additional var
    //because getting it from the old props is a pain in the ass because
    //in the future we might encounter a problem when adding more tile layers (for e.g. grayscale tile layer)
    //when this code is written leaflet doesn't give an option to add an id to a layer in-
    //order to get the object of the layer and remove it from the map object
  }

  render() {
    //getting map style values from props and making it accessible for rendering
    let map = this.props.map;

    return (
      <div className="map-wrapper">
        <div
          style={{ height: map.size.height, width: map.size.width }}
          id="map"
        />
      </div>
    );
  }
}

Map.propTypes = {
  map: PropTypes.shape({
    size: PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    }).isRequired,
    mapType: PropTypes.string.isRequired,
    layers: PropTypes.array
  })
};

export default Map;
