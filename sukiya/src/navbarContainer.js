import { connect } from 'react-redux'
import {Navbar} from './navbar'
import {setLoginState} from './actions'
import {
    withRouter
} from 'react-router-dom'
// 和 react connect
const mapStateToProps = state => ({
    //global state . 在 reducer 時指定的的 name . key
    userState: state.app.userState,
})

const mapDispatchToProps = dispatch =>({
    setLoginState: (state) => {
        dispatch(setLoginState(state))
    }
})
// withRouter 要包在最外面!!! 不然不會觸發 update 事件
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))