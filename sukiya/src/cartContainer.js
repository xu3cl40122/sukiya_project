import { connect } from 'react-redux'
import { Cart } from './cart'
// 和 react connect
// 接收
const mapStateToProps = state => ({
    cart: state.app.cart
})


// 和 withRouter 用法類似，把 POST 加上 store 內的 props 再 export ，
//第一個參數是接 state 第二個發 dispatch
// withRouter 要包在最外面!!! 不然不會觸發 update 事件
export default connect(mapStateToProps, null)(Cart)