import React from 'react'
import ReactDOM from 'react-dom'

export class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <div className="navbar_logo"></div>
                <ul className="navlist">
                    <li><i className="fa fa-cutlery"></i>線上訂餐</li>
                    <li><i className="fa fa-map-marker"></i>門市據點</li>
                    <li><i className="fa fa-users"></i>關於我們</li>
                    <li><i className="fa fa-info-circle"></i>最新消息</li>
                    <li><i className="fa fa-user"></i>登入</li>
                </ul>
            </div>
        )
    }
}