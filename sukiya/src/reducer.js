import { 
    GET_PRODUCTS, 
    GET_SINGLE, 
    CHANGE_CART,
    GET_SITE,
    LOGIN,
    SET_LOGIN_STATE,
    SEND_ORDER,
    CHECK_SESSION 
} from './actionTypes'
import { combineReducers } from 'redux'
const initialState ={
    products:[],
    singleProduct:{},
    cart:[],
    site:[],
    userState:{
        isCheckedSession: false //是否檢查過 session 登入情形
    },
    loginResponse:{},
    sendOrderRes:{}
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
        // login and sign up
        case `${LOGIN}_PENDING`: {//剛發出 request
            return {
                ...state
            }
        }
        case `${LOGIN}_FULFILLED`: {// success
            return {
                ...state,
                loginResponse: action.payload.data
            }
        }
        case `${LOGIN}_REJECTED`: {// error
            return {
                ...state
            }
        }
        // send order 
        case `${SEND_ORDER}_PENDING`: {//剛發出 request
            return {
                ...state
            }
        }
        case `${SEND_ORDER}_FULFILLED`: {// success
            return {
                ...state,
                sendOrderRes: action.payload.data
            }
        }
        case `${SEND_ORDER}_REJECTED`: {// error
            return {
                ...state
            }
        }
        // set deleted cart to redux
        case CHANGE_CART:{
            return{
                ...state,
                cart:action.value
            }
        }
        case SET_LOGIN_STATE:{
            return{
                ...state,
                userState:action.value

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