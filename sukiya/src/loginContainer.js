import { connect } from 'react-redux'
import { Login } from './login'
import { setLoginState,login } from './actions'
import {
    withRouter
} from 'react-router-dom'
// 和 react connect
// 接收
const mapStateToProps = state => ({
    userState: state.app.userState,
    loginResponse: state.app.loginResponse
})
const mapDispatchToProps = dispatch => ({
    setLoginState: (state) => {
        dispatch(setLoginState(state))
    },
    login:(state)=>{
        dispatch(login(state))
    }
})

// 和 withRouter 用法類似，把 POST 加上 store 內的 props 再 export ，
//第一個參數是接 state 第二個發 dispatch

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))