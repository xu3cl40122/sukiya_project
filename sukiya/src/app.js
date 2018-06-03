import React from 'react'
import ReactDOM from 'react-dom'
import { Header, Footer,Sidebar} from './navbar'
import {Navbrick} from './navbrick'
import {News} from './news'
import {Ani} from './animation'
import SimpleMap from "./mapContainer";
import ProductsRow from './productsRowContainer'
import Navbar from './navbarContainer'
import SingleProduct from './SingleProductContainer'
import { ParallaxProvider } from 'react-scroll-parallax'
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class Home extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <Header />
                <Navbrick />
                <News />
                <Footer />
            </div>
        )
    }
}

class Products extends React.Component{
    render(){
        return(
            <div>
            <Navbar />
            <Sidebar />
            <ProductsRow />
            </div>
        )
    }
}

class Single extends React.Component{
    render(){
        return (
        <div>
            <Navbar />
            <Sidebar />
            <SingleProduct />
        </div>)
    }
}

class Map extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <SimpleMap />
            </div>
        )
    }
}

export default class App extends React.Component{
    render(){
        return(
            <ParallaxProvider >
                <Router>
                    <div>
                    <Route exact path='/' component={Home} />
                    <Route path='/products/:type' component={Products} />
                    <Route path='/single/:type/:id' component={Single} />
                    <Route path='/map' component={Map} />
                    <Route path='/ani' component={Ani} />
                    </div>
                </Router>
            </ParallaxProvider>
        )
    }
}
