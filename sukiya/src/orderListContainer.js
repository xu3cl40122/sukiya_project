import { connect } from 'react-redux'
import { toCart } from './actions'
import { OrderList} from './orderList'
import {
    withRouter
} from 'react-router-dom'
// 和 react connect

// 發布
const mapDispatchToProps = dispatch => ({

    toCart: (product) => {
        dispatch(toCart(product))
    }
})

// 和 withRouter 用法類似，把 POST 加上 store 內的 props 再 export ，
//第一個參數是接 state 第二個發 dispatch
// withRouter 要包在最外面!!! 不然不會觸發 update 事件
export default connect(null, mapDispatchToProps)(OrderList)