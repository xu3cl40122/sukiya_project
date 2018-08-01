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
                <div className="navCol navCol-active"><p className='navCol_text'>HOME</p></div>
                <div className="navCol"><Link to='/products' className='link'> <p className='navCol_text'>ORDERS</p></Link></div>
                <div className="navCol"><p className='navCol_text'>PRODUCTS</p></div>
            </div>
        )
    }
}

export default withRouter(Navbar)