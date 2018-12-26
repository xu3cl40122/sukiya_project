import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {
    withRouter,
    Link
} from 'react-router-dom'
class ProductsRow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products:[]
        }
    }
    componentDidMount(){
        const { getProduct, match} = this.props
        getProduct(match.params.type)// call middleware
    }
    componentDidUpdate(prevProps){
        const { getProduct, match } = this.props
        if(prevProps.match.params != match.params){
            getProduct(match.params.type)
        }
    }
    render() {
        const {products,match} = this.props
        return (
            <div className="product_container bgPink">
                <div className="product_row">
                    {products.map(products=>{
                        return(
                            <Link to={`/single/${match.params.type}/${products.product_id}`} className='link' key={products.product_id}>
                            <div className="product_col" >
                                <div className="">
                                    <img src={products.img_path} alt="" className="product_col_img" />
                                </div>
                                <div className="product_col_inf">
                                    <h2 className="product_col_inf_name">{products.name}</h2>
                                    <h2 className="product_col_inf_price">{`$${products.price_s}起`}</h2>
                                </div>
                            </div>
                            </ Link>
                        )
                    })}
                    <div className="product_col_placeholder"></div>
                    <div className="product_col_placeholder"></div>
                </div>
            </div>
        )
    }
}
export {ProductsRow}
