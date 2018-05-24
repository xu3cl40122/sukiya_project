import { connect } from 'react-redux'
import { getProduct, changeNav} from './actions'
import { ProductsRow} from './productsRow'
// 和 react connect
// 接收
const mapStateToProps = state => ({
    products:state.app.products
})
// 發布
const mapDispatchToProps = dispatch => ({
    changeNav: (content)=>{
        console.log('change title')
        dispatch(changeNav(content))
    },
    getProduct: () => {
        dispatch(getProduct())
    }
})

// 和 withRouter 用法類似，把 POST 加上 store 內的 props 再 export ，
//第一個參數是接 state 第二個發 dispatch
export default connect(mapStateToProps, mapDispatchToProps)(ProductsRow)