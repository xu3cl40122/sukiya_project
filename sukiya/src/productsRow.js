import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export class ProductsRow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products:[]
        }
    }
    componentDidMount(){
        const { changeNav} = this.props
        axios.get('http://localhost:3000/products').then(response => {
            this.setState({
                products: response.data.products.bowl
            })
            console.log(this.state.products)
        })
        changeNav('777')
    }
    render() {
        const {products} = this.state
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