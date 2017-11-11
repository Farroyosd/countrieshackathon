import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class Map extends Component {
    constructor(props) {
        super(props);
    }
  static defaultProps = {

    latitude:32.71,
    longitude:-117.16,
    zoom: 5
  };

  render() {
    return (
        
      <GoogleMapReact
      center={{
          lat: this.props.data1.latlng[0],
          lng: this.props.data1.latlng[1]
        }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={this.props.data1.latlng[0]}
          lng={this.props.data1.latlng[1]}
          
        />
      </GoogleMapReact>
      
    );
  }
}