import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter, Link } from 'react-router-dom'
import Cart from './cartContainer'
import { AnimatedLogo } from './animation'
import axios from 'axios'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// 讓 axios 帶 cookie (預設不會帶)
//axios.defaults.withCredentials = true

export class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.checkSession = this.checkSession.bind(this)
        this.logout = this.logout.bind(this)
    }
    componentDidMount() {
        const{userState} = this.props
        window.scrollTo(0, 0)//換頁時把卷軸捲回去
        if(userState.isCheckedSession == false){
            this.checkSession()
        }
    }
    checkSession() {
        const{setLoginState, userState} = this.props
        axios({
            method: 'get',
            url: 'http://tomlee0122.tw/checkSession',
            withCredentials: true
        }).then((res) => {
            console.log(res.data)
           
            if(res.data!= 'noSession'){
                setLoginState({
                    ...userState,
                    isCheckedSession:true,
                    username : res.data.user,
                    user_id : res.data.user_id
                })
            }else{
                setLoginState({
                    ...userState,
                    isCheckedSession: true,
                })
            }
            
        })
    }
    logout() {
        var isSure = confirm('確定要登出?')
        if(!isSure){
            return
        }
        axios({
            method: 'get',
            url: 'http://tomlee0122.tw/logout',
            withCredentials: true
        }).then((res) => {
            this.props.history.push('/')
            this.props.setLoginState({ 
                isCheckedSession: true
            })
        })
    }
    render() {
        const { match, userState, location } = this.props
        return (
            <div>
                <div className="navbar">
                    {match.path == '/' ? <AnimatedLogo /> : <Link to='/'><div className='smallLogo-base'></div></Link>}
                    <ul className="navlist">
                        <li>
                            <Link to='/products/bowl' className="link"><i className="fa fa-cutlery"></i>線上訂餐</Link>
                        </li>
                        <li>
                            <Link to='/map' className="link"><i className="fa fa-map-marker"></i>門市地點</Link>
                        </li>
                        <li>
                            <Link to='/about' className="link"><i className="fa fa-users"></i>關於我們</Link >
                        </li>
                        <li onClick={() => { alert('該功能還在開發中') }}>
                            <Link to='' className='link'><i className="fa fa-info-circle"></i>最新消息</Link >
                        </li>
                        <li>
                            {userState.username !== undefined ? <div onClick={this.logout}><i className="fa fa-user"></i>{userState.username}</div> : <Link to='/account' className="link"><i className="fa fa-user"></i>登入</Link>}
                        </li>
                    </ul>
                </div>
                <MobileNavbar />
            </div>
        )
    }
}
class MobileNavbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowBar: false
        }
        this.toggleBar = this.toggleBar.bind(this)
    }
    toggleBar() {
        this.setState({
            isShowBar: !this.state.isShowBar
        })
    }
    render() {
        const { isShowBar } = this.state
        return (
            <div className='navbar-mobile'>
                <div className='logo'></div>
                <div className='toggle' onClick={this.toggleBar}>
                    <i className='fa fa-bars'></i>
                </div>
                <ReactCSSTransitionGroup
                    transitionName="bar"
                    transitionEnterTimeout={300}
                    transitionLeave={false}>
                    {isShowBar? <Bar toggleBar={this.toggleBar}/> : null}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}
class Bar extends React.Component {
    render() {
        const { toggleBar } = this.props
        return (
            <div className='bar-base'>
                <div className='bar_row'>
                    <div className='bar_col'>
                        <Link to='/' className="link" onClick={toggleBar}><i className="fa fa-home"></i>回到首頁</Link>
                    </div>
                    <div className='bar_col'>
                        <Link to='/products/bowl' className="link" onClick={toggleBar}><i className="fa fa-cutlery"></i>線上訂餐</Link>
                    </div>
                    <div className='bar_col'>
                        <Link to='/map' className="link" onClick={toggleBar}><i className="fa fa-map-marker"></i>門市地點</Link>
                    </div>

                </div>
                <div className='bar_back' onClick={toggleBar}><i className='fa fa-remove'></i></div>
            </div>
        )
    }
}
export class Header extends React.Component {
    render() {
        return (
            <div>
                <div className='null'></div>
                <div className='header'>
                    <div className='title'>
                        <h2 >すき家</h2>
                        <h3>リゾット & カレー </h3>
                    </div>
                </div>
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
        const { match } = this.props
        return (
            <div>
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
                <div className='sidebar-mobile '>
                    <div className='arrowLeft'><i className='fa fa-angle-left'></i></div>
                    <div className='arrowRight'><i className='fa fa-angle-right'></i></div>
                    <div className='container'>
                        <ul>
                            <Link to='/products/bowl' className="link"><li className={match.params.type == 'bowl' ? 'sidebar-mobile_line-active': null}>丼飯</li></Link>
                            <Link to='/products/curry' className="link"><li className={match.params.type == 'curry' ? 'sidebar-mobile_line-active' : null}>咖哩</li></Link>
                            <Link to='/products/other' className="link"><li className={match.params.type == 'other' ? 'sidebar-mobile_line-active' : null}>其他</li></Link>
                        </ul>
                    </div>
                    <Cart />
                </div>
            </div>
        )
    }
}
Sidebar = withRouter(Sidebar)
export { Sidebar }




