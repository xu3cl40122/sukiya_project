import React from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'

class Navbar extends React.Component{
    render(){
        console.log(this.props)
        const{match} = this.props
        return(
            <div className="navbar">
                <h1 className="logo">SUKIYA</h1>
                {/*<div className="navCol"><p className='navCol_text'>HOME</p></div>*/}
                <div className={match.path == '/'? 'navCol navCol-active' : 'navCol'}> <Link to='/' className='link'><p className='navCol_text'>ORDERS</p></Link></div>
                <div className={match.path == '/products' ? 'navCol navCol-active' : 'navCol'}><Link to='/products' className='link'><p className='navCol_text'>PRODUCTS</p></Link></div>
            </div>
        )
    }
}

export default withRouter(Navbar)