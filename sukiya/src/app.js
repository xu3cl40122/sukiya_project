import React from 'react'
import ReactDOM from 'react-dom'
import { Header, Footer, Sidebar, BgPink} from './navbar'
import Navbar from './navbarContainer'
import {Navbrick} from './navbrick'
import {News} from './news'
import ProductsRow from './productsRowContainer'
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
            <BgPink />            
            <ProductsRow />
            </div>
        )
    }
}

export default class App extends React.Component{
    render(){
        return(
            <Router>
                <div>
                <Route exact path='/' component={Home} />
                <Route path='/products/:type' component={Products} />
                </div>
            </Router>
        )
    }
}
