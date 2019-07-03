import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Map from "../components/Map.jsx";
import { fetchStations, fetchEstimates, addMapLayers } from "../actions";
import Station from "../components/Station.jsx";
import { toInt } from "../utils.js";
import bike from "../../bike.svg";
class TrainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationsReady: false
    };
  }
  //Making it a bit more comfortable for me to call dispatch
  dispatch(payload) {
    this.props.dispatch(payload);
  }
  componentDidMount() {
    //Calling stations data fetch from api
    this.dispatch(fetchStations());

    this.dispatch(fetchEstimates());
    //Calling estimates data fetch from api for every 5 seconds
    setInterval(() => {
      this.dispatch(fetchEstimates());
    }, 5000);
  }
  componentDidUpdate() {
    const { stationsReady } = this.state;
    const { stations } = this.props;

    //Checking if the stations weren't loaded and the api fetch is done
    if (!stationsReady && !stations.isFetching) {
      this.loadStations();
    }
  }
  loadStations() {
    const { stations, dispatch } = this.props;

    //Creating a new list of station layers to send to the store
    let stationsLayers = [];

    //Creating a ref for the current object to access state in functions of the station layer
    const trainMapObj = this;
    //Creating a ref for station click event handler
    const stationOnClickRef = this.stationOnClick;
    stations.items.map(function(station) {
      //Creating a new station layer object and passing it the station data, a function for onclick event callback and a ref
      //to the current object to access current app state (can't connect because its not a component)
      const stationLayer = new Station(station, stationOnClickRef, trainMapObj);
      stationsLayers.push(stationLayer);
    });
    //Dispatching the layer list created to the store for the map update
    dispatch(addMapLayers(stationsLayers));

    //Letting the state know that the station load already has been done
    this.state.stationsReady = true;
  }
  stationOnClick(event) {
    //Getting the station layer that called this event handler
    const stationLayer = event.target;

    //Getting the estimates from the state for this station (by station abbr)
    const estimatesOfStation = _.find(
      stationLayer.creatorObj.props.estimates.estimates,
      ["abbr", stationLayer.data.abbr]
    );
    //Checking if there is any estimates for the station
    if (estimatesOfStation !== undefined) {
      //OLD CODE: DIDN'T CHANGE
      let platforms = [];
      estimatesOfStation.etd.map(function(destination) {
        destination.estimate.map(function(estimate) {
          var plat = estimate.platform;
          if (!platforms[plat]) {
            platforms[plat] = {
              dir: estimate.direction,
              trains: []
            };
          }

          platforms[plat].trains.push({
            mins: estimate.minutes,
            destId: destination.abbreviation,
            dest: destination.destination,
            color: estimate.color,
            hexColor: estimate.hexcolor,
            bikeFlag: estimate.bikeflag == "1"
          });
        });
      });
      var stationInfo = "Station: <b>" + estimatesOfStation.name + "</b>";
      platforms.map(function(platform, platId) {
        platform.trains.sort((a, b) => toInt(a.mins) - toInt(b.mins));
        stationInfo += "<br>Platform " + platId + ": " + platform.dir;
        platform.trains.forEach(function(train) {
          let bikeSupport = "";
          if (train.bikeFlag) {
            bikeSupport =
              "<img style='height:15px; vertical-align:center' src='" +
              bike +
              "' />";
          }
          stationInfo +=
            "<br> <img class='bart-bullet' style='background:" +
            train.hexColor +
            "'/>" +
            train.mins +
            " min -- " +
            train.dest +
            " (" +
            bikeSupport +
            ", " +
            train.color.toLowerCase() +
            ")";
        });
        stationInfo += "<br>";
      });

      //Set the new content of the station popup
      stationLayer.setPopupContent(stationInfo);
    }
  }
  render() {
    const { isFetching } = this.props.stations;
    return !isFetching ? <Map map={this.props.map} /> : "Loading...";
  }
}

const mapStateToProps = state => ({
  map: state.map,
  stations: state.stations,
  estimates: state.estimates
});

export default connect(mapStateToProps)(TrainMap);
