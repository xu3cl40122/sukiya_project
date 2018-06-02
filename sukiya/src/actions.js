import { GET_PRODUCTS, TO_CART, GET_SINGLE,DELETE_FROM_CART,GET_SITE} from './actionTypes'
import axios from 'axios'

// 如果只要 return 可以 =>( 要return的東西 )
export const getProduct = (kind) => ({
    type: GET_PRODUCTS,
    payload: axios.get('http://localhost:3000/products'),
    meta: kind//用來在 reducer 決定要 set 哪一類商品去 globl state
    
})
export const getSingle = (id) =>({
    type: GET_SINGLE,
    payload: axios.get('http://localhost:3000/products/'+id)
})
export const getSite = ()=>({
    type:GET_SITE, 
    payload: axios.get('http://localhost:3000/site')
})
//加入購物車
export const toCart = (products) =>({
    type:TO_CART,
    value: products
})

export const deleteFromCart = (newCart) =>({
    type:DELETE_FROM_CART,
    value:newCart
})