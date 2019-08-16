import React, { Component } from "react";
import TrainMap from "./containers/TrainMap.jsx";
import { connect } from "react-redux";
import { setMapSize, setMapType } from "./actions";
import { mapType } from "./enums";
import Navbar from "./ui/Navbar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //Just as an example for map types
    this.props.dispatch(setMapType(mapType.satellite));
  }
  resize() {
    this.props.dispatch(setMapSize({ height: window.innerHeight - 74 }));
  }
  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  render() {
    return (
      <div>
        <Navbar />
        <TrainMap />
      </div>
    );
  }
}

export default connect()(App);
