import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class SimpleMap extends Component {
    

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '400px', width: '50%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCfHAr-ZARIBL8FD7OXmzBgkcZ3jXGwPOE' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <Site
                        lat={25.027897}
                        lng={121.521595}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}
SimpleMap.defaultProps = {
    center: {
        lat: 25.0385852,
        lng: 121.5216822
    },
    zoom: 13
}

class Site extends React.Component{
    render(){
        return(
            <div className='site'>sukiya</div>
        )
    }
}



export default SimpleMap;