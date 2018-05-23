import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'

export class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Link to='/'><div className="navbar_logo"></div></Link>
                <ul className="navlist">
                    <li>
                        <Link to='/products' className="link"><i className="fa fa-cutlery"></i>線上訂餐</Link>
                    </li>
                    <li><i className="fa fa-map-marker"></i>門市據點</li>
                    <li><i className="fa fa-users"></i>關於我們</li>
                    <li><i class="fa fa-info-circle"></i>最新消息</li>
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

export class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar_line">丼飯</div>
                <div className="sidebar_line-active sidebar_line">咖哩飯</div>
                <div className="sidebar_line">定食</div>
                <div className="sidebar_line">其他</div>
            </div>
        )
    }
}

export class BgPink extends React.Component {
    render() {
        return (
            <div className="BgPink"></div>
        )
    }
}


