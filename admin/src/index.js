import React from 'react'
import ReactDOM from 'react-dom'
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Navbar from './navbar'
import {Orders} from './orders'
import {Products} from './products'

class OrdersPage extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <Orders />
            </div>
        )
    }
}
class ProductsPage extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <Products />
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={OrdersPage} />
                    <Route exact path='/products' component={ProductsPage} />
                </div>

            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);