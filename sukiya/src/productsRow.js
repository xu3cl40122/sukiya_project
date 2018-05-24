import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {
    withRouter
} from 'react-router-dom'
class ProductsRow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products:[]
        }
    }
    componentDidMount(){
        const {getProduct} = this.props
        axios.get('http://localhost:3000/products').then(response => {
            this.setState({
                products: response.data.products.bowl
            })
        })
        getProduct()// call middleware
    }
    render() {
        const {products,match} = this.props
        console.log(match)
        //console.log('props:',this.props)
        return (
            <div className="product_container bgPink">
                <div className="product_row">
                    {products.map(products=>{
                        return(
                            <div className="product_col" key ={products.product_id}>
                                <div className="product_col_img">
                                    <img src={products.img_path} alt="" className="product_row_img" />
                                </div>
                                <div className="product_col_inf">
                                    <h2 className="product_col_inf_name">{products.name}</h2>
                                    <h2 className="product_col_inf_price">{`$${products.price_s}起`}</h2>
                                </div>
                            </div>
                        )
                    })}
                    <div className="product_col_placeholder"></div>
                    <div className="product_col_placeholder"></div>
                </div>
            </div>
        )
    }
}
ProductsRow = withRouter(ProductsRow)
export {ProductsRow}
