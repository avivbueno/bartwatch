import React, { Component } from "react";
//REDUX
import { connect } from "react-redux";
import { subscribe } from "redux-subscriber";
import { fetchStations, fetchEstimates, addMapLayers } from "../actions";
//UTILS
import _ from "lodash";
import { toInt } from "../utils.js";
import { playSampler, initSampler } from "../audio.js";
//COMPONENTS/CLASSES
import Map from "../components/Map.jsx";
import Station from "../components/Station.jsx";
//MEDIA
import bike from "../../bike.svg";
//Enums
import { bartSound } from "../enums";
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

    //Sampler for train sounds
    initSampler();
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
    let unsubscribeFromStationDataChange = [];
    //Creating a new list of station layers to send to the store
    let stationsLayers = [];

    const renderEstimatesForStation = this.renderEstimatesForStation;
    stations.items.map(function(station) {
      //Creating a new station layer object and passing it the station data, a function for onclick event callback and a ref
      //to the current object to access current app state (can't connect because its not a component)
      const stationLayer = new Station(station);
      const unsubscribe = subscribe("estimates.estimates", state => {
        const estimatesOfStation = _.find(state.estimates.estimates, [
          "abbr",
          stationLayer.data.abbr
        ]);
        const stationPopupView = renderEstimatesForStation(estimatesOfStation);
        //updating popup content with new estimates view
        if (stationPopupView[0] != "") {
          stationLayer.setPopupContent(stationPopupView[0]);
          //stationLayer.setColor(stationPopupView[1]);
          const color = stationPopupView[1];
          if (color != "non") {
            //Here we can make sounds for each train arriving to the station (for each color)
            switch (color) {
              case "yellow":
                playSampler(bartSound.LOW_DING);
                break;
              case "blue":
                playSampler(bartSound.HIGH_DING);
                break;
            }
          }
        }
      });
      unsubscribeFromStationDataChange[station.abbr] = unsubscribe;
      stationsLayers.push(stationLayer);
    });
    //Dispatching the layer list created to the store for the map update
    dispatch(addMapLayers(stationsLayers));

    //Letting the state know that the station load already has been done
    this.state.stationsReady = true;
  }

  renderEstimatesForStation(estimatesOfStation) {
    if (estimatesOfStation !== undefined) {
      //OLD CODE: DIDN'T CHANGE
      let platforms = [];
      estimatesOfStation.etd.map(function(destination) {
        destination.estimate.map(function(estimate) {
          let plat = estimate.platform;
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
      let trainColorInStation = "non";
      let stationInfoView = "Station: <b>" + estimatesOfStation.name + "</b>";
      platforms.map(function(platform, platId) {
        platform.trains.sort((a, b) => toInt(a.mins) - toInt(b.mins));
        stationInfoView += "<br>Platform " + platId + ": " + platform.dir;
        platform.trains.forEach(function(train) {
          let bikeSupport = "";
          if (train.bikeFlag) {
            bikeSupport =
              "<img style='height:15px; vertical-align:center' src='" +
              bike +
              "' />";
          }
          if (train.mins.toLowerCase() == "leaving") {
            trainColorInStation = train.color.toLowerCase();
          }
          stationInfoView +=
            "<br> <img class='bart-bullet' style='background:" +
            train.hexColor +
            "'/>" +
            train.mins +
            (train.mins != "Leaving" ? " min -- " : " -- ") +
            train.dest +
            " (" +
            bikeSupport +
            ", " +
            train.color.toLowerCase() +
            ")";
        });
        stationInfoView += "<br>";
      });
      //Set the new content of the station popup
      return [stationInfoView, trainColorInStation];
    }
    return ["", "non"];
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
