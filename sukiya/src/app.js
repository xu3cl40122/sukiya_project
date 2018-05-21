import React from 'react'
import ReactDOM from 'react-dom'
import {Navbar, Header} from './navbar'
import {Navbrick} from './navbrick'
import {News} from './news'
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
            </div>
        )
    }
}

class Products extends React.Component{
    render(){
        return(
            <Navbar />
        )
    }
}

export default class App extends React.Component{
    render(){
        return(
            <Router>
                <div>
                <Route exact path='/' component={Home} />
                <Route exact path='/products' component={Products} />
                </div>
            </Router>
        )
    }
}
