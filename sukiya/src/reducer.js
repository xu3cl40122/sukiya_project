import { GET_PRODUCTS, GET_SINGLE } from './actionTypes'
import { combineReducers } from 'redux'
const initialState ={
    products:[],
    singleProduct:{}
}
function AppReducer(state = initialState, action){
    switch(action.type){
        case `${GET_PRODUCTS}_PENDING`:{//剛發出 request
            return{
                ...state
            }
        }
        case `${GET_PRODUCTS}_FULFILLED`: {// success
            return {
                ...state,//想在這裡做用 meta 切換設定的 state
                products:action.payload.data.products[action.meta]// payload 對應本來的 response.data
            }
        }
        case `${GET_PRODUCTS}_REJECTED`: {// error
            return {
                ...state
            }
        }
        case `${GET_SINGLE}_PENDING`: {//剛發出 request
            return {
                ...state
            }
        }
        case `${GET_SINGLE}_FULFILLED`: {// success
            return {
                ...state,
                singleProduct: action.payload.data[0]
            }
        }
        case `${GET_SINGLE}_REJECTED`: {// error
            return {
                ...state
            }
        }
        default:
            return state
    }
}
// 把 reducer 包在一起 export
const App = combineReducers({
    app:AppReducer
})

export default App