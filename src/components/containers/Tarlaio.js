import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actionTypes from "../store/action_types";
import "./Tarlaio.css";
import Datatable from "../Datatable/Datatable";
import Map from "../Map/Map";
import Piechart from "../Piechart/Piechart";

class Tarlaio extends Component {
  state = {
    isMarkerShown: false
  };

  componentDidMount() {
    this.props.fetchAllUsers();
    this.props.fetchAllPosts();
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
              markers={this.props.markers}
              isMarkerShown={this.state.isMarkerShown}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />{" "}
          </div>
          <div className="div2">
            <Piechart data={this.props.piechart} />
          </div>
        </section>
        <div className="datatable">
          <Datatable
            users={this.props.users}
            addMarkers={this.props.addMarkers}
            removeMarkers={this.props.removeMarkers}
            addAllMarkers={this.props.addAllMarkers}
            removeAllMarkers={this.props.removeAllMarkers}
            addPie={this.props.addPie}
            removePie={this.props.removePie}
            addAllPie={this.props.addAllPie}
            removeAllPie={this.props.removeAllPie}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    markers: state.markers,
    piechart: state.piechart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => {
      axios.get("https://jsonplaceholder.typicode.com/users").then(response => {
        dispatch({ type: actionTypes.FETCH_USERS, payload: response.data });
      });
    },

    fetchAllPosts: () => {
      axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
        dispatch({ type: actionTypes.FETCH_POSTS, payload: response.data });
      });
    },

    addMarkers: markers =>
      dispatch({ type: actionTypes.ADD_MARKERS, payload: markers }),

    removeMarkers: userId =>
      dispatch({ type: actionTypes.REMOVE_MARKERS, payload: userId }),

    addAllMarkers: () => dispatch({ type: actionTypes.ADD_ALL_MARKERS }),

    removeAllMarkers: () => dispatch({ type: actionTypes.REMOVE_ALL_MARKERS }),

    addPie: (name, userId) =>
      dispatch({ type: actionTypes.ADD_PIE, name, userId }),

    removePie: userId => dispatch({ type: actionTypes.REMOVE_PIE, userId }),

    addAllPie: () => dispatch({ type: actionTypes.ADD_ALL_PIE }),

    removeAllPie: () => dispatch({ type: actionTypes.REMOVE_ALL_PIE })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tarlaio);
