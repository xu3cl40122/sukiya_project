import { GET_PRODUCTS} from './actionTypes'
import axios from 'axios'

// 如果只要 return 可以 =>( 要return的東西 )
export const getProduct = () => ({
    type: GET_PRODUCTS,
    payload: axios.get('http://localhost:3000/products')
})