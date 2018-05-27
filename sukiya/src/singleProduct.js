import React from 'react'
import ReactDOM from 'react-dom'
import { getSingle } from './actions';

export class SingleProduct extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            orderList : [
                {id:1}
            ]
        }
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
                        <div>
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
                <OrderList />
            </div>
            )
    }
}

class OrderList extends React.Component{
    constructor(props){
        super(props)
        this.state ={
        }
    }
    updateOrder(){

    }
    render(){
        return(
            <div className="mealList_container">
                <h2 className="mealList_title">客製餐點</h2>
                <div className="mealList_title_border"></div>
                <div className="mealList_row">
                    <OrderListCol />
                </div>
                <div className='button mealList_row_addCol'>新增</div>
                <div className="button mealList_row_toCart">加入購物車</div>
            </div>
        )
    }
}

class OrderListCol extends React.Component{
    constructor(props){
        super(props)
        this.state={
            num:1,
            size:'中碗',
            set:'無'
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        return(
            <div className="mealList_col">
                <h2 className="mealList_col_name">青蔥生蛋牛丼</h2>
                <p>大小:</p>
                <select name="size" value={this.state.size} onChange={this.handleChange}>
                    <option value="迷你碗">迷你碗</option>
                    <option value="中碗">中碗</option>
                    <option value="超值碗">超值碗</option>
                    <option value="超大碗">超大碗</option>
                </select>
                <p>套餐:</p>
                <select name="set" value={this.state.set} onChange={this.handleChange}>
                    <option value="none">無</option>
                    <option value="veg">青菜套餐</option>
                    <option value="cola">可樂餅套餐</option>
                </select>
                <p>數量:</p>
                <input name='num' value={this.state.num} onChange={this.handleChange} type="number" min="1" max="20" className="mealList_col_num" />
                <i className="fa fa-close mealList_col_delete"></i>
            </div>
        )
    }
}