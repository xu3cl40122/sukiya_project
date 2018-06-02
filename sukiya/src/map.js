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
    zoomIn(center){
        console.log(center)
        this.setState({
            zoom:16,
            center:{
                lat: center.lat,
                lng: center.lng
            },
        })
    }
    componentDidMount(){
        const {getSite} = this.props 
        getSite()
    }
    
    render() {
        const{site}= this.props
        return (
            // Important! Always set the container height explicitly
            <div className='mapContainer'>
                <div className='mapBox'>
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
                    {site.map(item=>{
                        return(
                            <Site lat={item.y} lng={item.x} name={item.name}/>
                        )
                    })}    
                    </GoogleMapReact>
                </div>
                <SearchBox site={site} zoomIn = {this.zoomIn}/>
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
        const { name } = this.props
        return(
            <div>
                <div className='site' data_name={name}></div>
            </div>
        )   
    }
}

class SearchBox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            raw:'',
            center:{},
            site:''
        }
        this.onChange = this.onChange.bind(this)
    }
    //是監測 value 和 option 的 value 是否相等來判斷選哪一個，及使選到那個 option ， 
    //setState 沒有設定對應的 value 還是不會選到
    onChange(e){
        //array schema 1:name 2:x 3:y
        let list = e.target.value.split(',')
        this.setState({
            raw: e.target.value,
            site: list[0],
            center: {
                lat: parseFloat(list[2]),
                lng: parseFloat(list[1])
            }
        })
    }
    
    render(){
        const {site,zoomIn} = this.props
        return(
            <div className='searchBox'>
                <h2>門市查詢</h2>
                <p>門市:</p>
                <select value={this.state.raw} onChange={this.onChange}>
                    <option>選擇門市</option>
                    {site.map(item => {
                        return (
                            <SiteOption site={item} key={item.site_id}/>
                        )
                    })}
                </select>
                <div className='button searchBox_searchButton' onClick={()=>{zoomIn(this.state.center)}}>查詢</div>
            </div>
        )
    }
}

class SiteOption extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {site} = this.props
        return(
            <option value={[site.name,site.x,site.y]}>{site.name}</option>
        )
    }
}

export default SimpleMap;