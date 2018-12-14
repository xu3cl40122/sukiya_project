import React from 'react'
import ReactDOM from 'react-dom'
import { getSingle } from './actions';
import  OrderList from './orderListContainer'

export class SingleProduct extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const{match,getSingle} = this.props
        getSingle(match.params.id)
    }
    render() {
        const{product,match} = this.props
        var priceCol = 4
        //決定顯示價格的種類數
        switch(match.params.type){
            case 'bowl':
                priceCol = 4
                break
            case 'curry':
                priceCol = 3
                break
            case 'other':
                priceCol = 1
                break
        }
        return (
            <div className="product_container bgPink">
                <div className="single_container">
                    <img src={product.img_path} alt="" className="single_img" />
                    <div className="single_inf_container">
                        <div className='single_inf_top'>
                            <h2 className="single_inf_name">{product.name}</h2>
                            <p className="single_inf_intro">{product.intro}</p>
                        </div>
                        <div className="single_inf_price_row">
                            <div className="single_inf_price_col">
                                <span className="single_inf_price_size">迷你碗 : </span><span className="single_inf_price_price">{'$'+product.price_s}</span>
                            </div>
                            {(priceCol > 1) &&<div className="single_inf_price_col">
                                <span className="single_inf_price_size">中碗 : </span>
                                <span className="single_inf_price_price">{'$' + product.price_m}</span>
                            </div>}
                            {(priceCol > 2) &&<div className="single_inf_price_col">
                                <span className="single_inf_price_size">超值碗 : </span>
                                <span className="single_inf_price_price">{'$' + product.price_l}</span>
                            </div>}
                            {(priceCol >3) &&<div className="single_inf_price_col">
                                <span className="single_inf_price_size">超大碗 : </span>
                                <span className="single_inf_price_price">{'$' + product.price_xl}</span>
                            </div>}
                        </div>
                    </div>
                </div>
                <OrderList product={product}/>
            </div>
            )
    }
}

