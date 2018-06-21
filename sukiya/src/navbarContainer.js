import { connect } from 'react-redux'
import {Navbar} from './navbar'
import {
    withRouter
} from 'react-router-dom'
// 和 react connect
const mapStateToProps = state => ({
    nav:state.app.nav, //global state . 在 reducer 時指定的的 name . key
    userState: state.app.userState
})

// 和 withRouter 用法類似，把 POST 加上 store 內的 props 再 export ，
export default withRouter(connect(mapStateToProps, null)(Navbar))