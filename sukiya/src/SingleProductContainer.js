import { connect } from 'react-redux'
import {getSingle} from './actions'
import { SingleProduct } from './singleProduct'
import {
    withRouter
} from 'react-router-dom'
// 和 react connect
// 接收
const mapStateToProps = state => ({
    product: state.app.singleProduct
})
// 發布
const mapDispatchToProps = dispatch => ({
    getSingle: (id) => {
        dispatch(getSingle(id))
    }
})

// 和 withRouter 用法類似，把 POST 加上 store 內的 props 再 export ，
//第一個參數是接 state 第二個發 dispatch
// withRouter 要包在最外面!!! 不然不會觸發 update 事件
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct))