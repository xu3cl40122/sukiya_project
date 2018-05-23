import { GET_PRODUCTS } from './actionTypes'
import { combineReducers } from 'redux'
const initialState ={
    products:{}
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
                ...state,
                products:action.payload.data.products.curry// payload 對應本來的 response.data
            }
        }
        case `${GET_PRODUCTS}_REJECTED`: {// error
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