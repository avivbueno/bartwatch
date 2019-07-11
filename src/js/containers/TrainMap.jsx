import { connect } from "react-redux";
import Map from "../components/Map.jsx";

const mapStateToProps = state => ({
  map: state.map
});

export default connect(mapStateToProps)(Map);
