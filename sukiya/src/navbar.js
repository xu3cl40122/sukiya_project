import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter, Link} from 'react-router-dom'
import { Cart} from './cart'
export class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Link to='/'><div className="navbar_logo"></div></Link>
                <ul className="navlist">
                    <li>
                        <Link to='/products/bowl' className="link"><i className="fa fa-cutlery"></i>線上訂餐</Link>
                    </li>
                    <li><i className="fa fa-map-marker"></i>門市地點</li>
                    <li><i className="fa fa-users"></i>關於我們</li>
                    <li><i className="fa fa-info-circle"></i>最新消息</li>
                    <li><i className="fa fa-user"></i>登入</li>
                </ul>
            </div>
        )
    }
}

export class Header extends React.Component{
    render(){
        return(
            <div>
                <div className='null'></div>            
                <div className="header"></div>
            </div>
        )
    }
}

export class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="footer_socialLink">
                    <i className="fa fa-facebook-square"></i>
                    <i className="fa fa-twitter-square"></i>
                </div>
                <p>©Hao Lee All Rights Reserved.</p>
            </div>
        )
    }
}

class Sidebar extends React.Component {
    render() {
        const {match} = this.props
        return (
            <div className="sidebar">
                <Link to='/products/bowl' className="link">
                    <div className={'sidebar_line ' + (match.params.type == 'bowl' && 'sidebar_line-active')}>丼飯</div>
                </Link>
                <Link to='/products/curry' className="link">
                    <div className={'sidebar_line ' + (match.params.type == 'curry' && 'sidebar_line-active')}>咖哩飯</div>
                </Link>
                <Link to='/products/other' className="link">
                    <div className={'sidebar_line ' + (match.params.type == 'other' && 'sidebar_line-active')}>其他</div>
                </Link>
                <Cart />
            </div>
        )
    }
}
Sidebar = withRouter(Sidebar)
export {Sidebar}

export class BgPink extends React.Component {
    render() {
        return (
            <div className="BgPink"></div>
        )
    }
}


