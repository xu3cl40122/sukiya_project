import React from 'react'
import ReactDOM from 'react-dom'
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Navbar from './navbar'
import {Orders} from './orders'

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
class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={OrdersPage} />
                   
                </div>

            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);