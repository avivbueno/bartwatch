import React, { Component } from "react";
import TrainMap from "./containers/TrainMap.jsx";
import { connect } from "react-redux";
import { setMapSize, setMapType } from "./actions";
import { mapType } from "./enums";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  resize() {
    this.props.dispatch(setMapSize({ height: window.innerHeight - 10 }));
  }
  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    //Just as an example for map types
    this.props.dispatch(setMapType(mapType.satellite));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  render() {
    return <TrainMap />;
  }
}

export default connect()(App);
