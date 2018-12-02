import React, { Component } from "react";
import "./Tarlaio.css";
import Datatable from "../Datatable/Datatable";
import Map from "../Map/Map";
import Piechart from "../Piechart/Piechart";

class Tarlaio extends Component {
  state = {
    isMarkerShown: false
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <div>
        <header>tarla.io</header>
        <section>
          <div className="div1">
            <Map
              isMarkerShown={this.state.isMarkerShown}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />{" "}
          </div>
          <div className="div2">
            <Piechart />
          </div>
        </section>
        <div>
          <Datatable />
        </div>
      </div>
    );
  }
}
export default Tarlaio;
