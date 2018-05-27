import React from 'react'
import ReactDOM from 'react-dom'

export class SingleInf extends React.Component {
    render() {
        return (
            <div className="product_container bgPink">
                <div className="single_container">
                    <img src="./pic/products/cow.jpg" alt="" className="single_img" />
                    <div className="single_inf_container">
                        <h2 className="single_inf_name">青蔥生蛋牛丼</h2>
                        <p className="single_inf_intro">牛丼，是將切成薄片的牛肉和洋蔥，經過醬油和白糖等調味料燉煮之後，澆蓋在白米飯上的牛肉蓋飯。牛丼使午餐等變得更加便利快捷，是極具代表性的日本快餐。同時能讓人享用到營養價值高，搭配均衡的健康美食。如果搭配上韓國泡菜或芝士等配菜會更加美味可口。根據個人的喜好，分量從小碗到超大碗共有6類可供選擇。</p>
                        <div className="single_inf_price_row">
                            <div className="single_inf_price_col">
                                <span className="single_inf_price_size">迷你碗 : </span><span className="single_inf_price_price">$69</span>
                            </div>
                            <div className="single_inf_price_col">
                                <span className="single_inf_price_size">迷你碗 : </span>
                                <span className="single_inf_price_price">$69</span>
                            </div>
                            <div className="single_inf_price_col">
                                <span className="single_inf_price_size">迷你碗 : </span>
                                <span className="single_inf_price_price">$69</span>
                            </div>
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
    handleChange(e){
        console.log(e.target)
        this.setState({
            num:e.target.value
        })
    }
    render(){
        return(
            <div className="mealList_container">
                <h2 className="mealList_title">客製餐點</h2>
                <div className="mealList_title_border"></div>
                <div className="mealList_row">
                    <OrderListCol />
                </div>
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
                    <option value="中碗" selected>中碗</option>
                    <option value="超值碗">超值碗</option>
                    <option value="超大碗">超大碗</option>
                </select>
                <p>套餐:</p>
                <select name="set" value={this.state.set}>
                    <option value="none" selected>無</option>
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