import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class SimpleMap extends Component {
    constructor(props){
        super(props)
        this.state={
            zoom:13,
            center:{
                lat: 25.0385852,
                lng: 121.5216822
            },
            canZoomIn:0
        }
        this.zoomIn = this.zoomIn.bind(this)
    }
    zoomIn(){
        this.setState({
            zoom:16,
            center:{
                lat: 25.0385852,
                lng: 121.5216822
            },
        })
    }
    render() {
        console.log(this.state)
        return (
            // Important! Always set the container height explicitly
            <div>
                <div onClick={this.zoomIn}>button</div>
                <div style={{ height: '400px', width: '50%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCfHAr-ZARIBL8FD7OXmzBgkcZ3jXGwPOE' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        zoom={this.state.zoom}
                        center={this.state.center}
                        onBoundsChange={( center, zoom, bounds, marginBounds )=>{
                            this.setState({center:center,zoom:zoom})
                            //讓 map 的 center、zoom 和 state 的同步
                        }} 
                    >
                        <Site
                            lat={25.027897}
                            lng={121.521595}
                        />
                    </GoogleMapReact>
                </div>
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