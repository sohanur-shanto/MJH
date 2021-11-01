import React, { Component } from "react";
import MapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { Icon } from "semantic-ui-react";

const TOKEN =
  "pk.eyJ1IjoiYWJoaWxhc2hhLXNpbmhhIiwiYSI6ImNqdzFwYWN1ajBtOXM0OG1wbHAwdWJlNmwifQ.91s73Dy03voy-wPZEeuV5Q";


const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};


const markerList = [

];
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 23.6850,
        longitude: 90.3563,
        zoom: 7,
        bearing: 0,
        pitch: 0,
        width: "100%",
        height: 500
      },
      popupInfo: null
    };
  }

  renderPopup(index) {
    return (
      this.state.popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom-right"
          longitude={markerList[index].long}
          latitude={markerList[index].lat}
          onMouseLeave={() => this.setState({ popupInfo: null })}
          closeOnClick={true}
        >
          <p>
            <strong>{markerList[index].name}</strong>
            <br />
            Available beds:{markerList[index].info}
          </p>
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxApiAccessToken={TOKEN}
      >
        <div className="nav" style={navStyle}>
          <NavigationControl
            onViewportChange={viewport => this.setState({ viewport })}
          />
          {markerList.map((marker, index) => {
            return (
              <div key={index}>
                {" "}
                <Marker longitude={marker.long} latitude={marker.lat}>
                  <Icon
                    name="hospital"
                    size="big"
                    onMouseEnter={() => this.setState({ popupInfo: true })}
                    onMouseLeave={() => this.setState({ popupInfo: null })}
                  />
                </Marker>{" "}
                {this.renderPopup(index)}
              </div>
            );
          })}
        </div>
      </MapGL>
    );
  }
}
