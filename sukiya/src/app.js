import React from 'react'
import ReactDOM from 'react-dom'
import { Header, Footer,Sidebar} from './navbar'
import {Navbrick} from './navbrick'
import {News} from './news'
import SimpleMap from "./map";
import ProductsRow from './productsRowContainer'
import Navbar from './navbarContainer'
import SingleProduct from './SingleProductContainer'
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

export default class App extends React.Component{
    render(){
        return(
            <Router>
                <div>
                <Route exact path='/' component={Home} />
                <Route path='/products/:type' component={Products} />
                <Route path='/single/:type/:id' component={Single} />
                    <Route path='/map' component={SimpleMap} />
                </div>
            </Router>
        )
    }
}
