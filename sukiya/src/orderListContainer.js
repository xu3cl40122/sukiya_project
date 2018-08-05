import { connect } from 'react-redux'
import { toCart,changeCart } from './actions'
import { OrderList} from './orderList'
import {
    withRouter
} from 'react-router-dom'
// 和 react connect
const mapStateToProps = state => ({
    cart: state.app.cart
})
// 發布
const mapDispatchToProps = dispatch => ({

    changeCart: (product) => {
        dispatch(changeCart(product))
    }
})

// 和 withRouter 用法類似，把 POST 加上 store 內的 props 再 export ，
//第一個參數是接 state 第二個發 dispatch
// withRouter 要包在最外面!!! 不然不會觸發 update 事件
export default connect(mapStateToProps, mapDispatchToProps)(OrderList)