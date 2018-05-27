import { GET_PRODUCTS, CHANGE_NAV, GET_SINGLE} from './actionTypes'
import axios from 'axios'

// 如果只要 return 可以 =>( 要return的東西 )
export const getProduct = (kind) => ({
    type: GET_PRODUCTS,
    payload: axios.get('http://localhost:3000/products'),
    meta: kind//沒辦法得到 kind 的值
    
})
export const getSingle = (id) =>({
    type: GET_SINGLE,
    payload: axios.get('http://localhost:3000/products/'+id)
})

