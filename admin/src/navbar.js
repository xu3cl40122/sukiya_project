import React from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'

class Navbar extends React.Component{
    render(){
        return(
            <div className="navbar">
                <h1 className="logo">SUKIYA</h1>
                <div className="navCol navCol-active"><p>HOME</p></div>
                <div className="navCol"><p>ORDERS</p></div>
                <div className="navCol"><p>PRODUCTS</p></div>
            </div>
        )
    }
}

export default withRouter(Navbar)