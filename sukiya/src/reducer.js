import { GET_PRODUCTS, GET_SINGLE, TO_CART,DELETE_FROM_CART,GET_SITE } from './actionTypes'
import { combineReducers } from 'redux'
const initialState ={
    products:[],
    singleProduct:{},
    cart:[],
    site:[]
}
function AppReducer(state = initialState, action){
    switch(action.type){
        // call products api
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

        // call single product api
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
        // call site api 
        case `${GET_SITE}_PENDING`: {//剛發出 request
            return {
                ...state
            }
        }
        case `${GET_SITE}_FULFILLED`: {// success
            return {
                ...state,
                site: action.payload.data
            }
        }
        case `${GET_SITE}_REJECTED`: {// error
            return {
                ...state
            }
        }

        // set product to cart
        case TO_CART :{
            return{
                ...state,
                cart:[...state.cart, action.value]
            }
        }
        // set deleted cart to redux
        case DELETE_FROM_CART:{
            return{
                ...state,
                cart:action.value
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