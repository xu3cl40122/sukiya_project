import { connect } from 'react-redux'
import { getPost} from './actions'
import { ProductsRow} from './productsRow'
// 和 react connect
const mapStateToProps = state => ({
    post: state.app.post,
    isLoading: state.app.isLoading
})
const mapDispatchToProps = dispatch => ({
    changeTitle: title => {
        console.log('change title')
        dispatch(changeTitle(title))
    },//dispatch 接之前寫好的 action
    changeContent: content => {
        dispatch(changeContent(content))
    },
    getPost: id => {
        dispatch(getPost(id))
    }
})

// 和 withRouter 用法類似，把 POST 加上 store 內的 props 再 export ，
//第一個參數是接 state 第二個發 dispatch
export default connect(mapStateToProps, mapDispatchToProps)(Post)