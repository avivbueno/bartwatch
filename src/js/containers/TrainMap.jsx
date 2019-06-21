import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../components/Map.jsx";
import { fetchStations, addMapLayers } from "../actions";
import Station from "../components/Station.jsx";

class TrainMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stationsReady: false
    };
  }
  componentDidMount() {
    this.fetchStations();
  }

  //TODO: CHANGE THIS WAY
  componentDidUpdate() {
    const { stationsReady } = this.state;
    const { stations } = this.props;
    if (!stationsReady && !stations.isFetching) {
      this.loadStations();
    }
  }
  loadStations() {
    const { stationsReady } = this.state;
    const { stations, dispatch } = this.props;

    let stationsLayers = [];

    stations.items.map(function(station) {
      let stationLayer = Station(station.gtfs_latitude, station.gtfs_longitude);
      stationsLayers.push(stationLayer);
    });
    dispatch(addMapLayers(stationsLayers));
    this.state.stationsReady = true;
  }
  fetchStations() {
    const { dispatch } = this.props;
    dispatch(fetchStations());
  }
  render() {
    const { isFetching } = this.props.stations;
    return !isFetching ? <Map map={this.props.map} /> : "Loading";
  }
}

const mapStateToProps = state => ({
  map: state.map,
  stations: state.stations
});

export default connect(mapStateToProps)(TrainMap);
