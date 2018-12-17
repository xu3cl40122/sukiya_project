import React from 'react'
import {
    withRouter
} from 'react-router-dom'
 export class OrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderListMap: [{ id: 0 }], // controll num and render of col  
            orders:{}
        }
        this.addCol = this.addCol.bind(this)
        this.removeCol = this.removeCol.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.id = 1
    }
    updateOrder(id,data) {
        this.setState({
            orders:{...this.state.orders, [id]:data}
        })
    }
    addCol() {
        this.setState({
            orderListMap: [...this.state.orderListMap,
            {
                id: this.id++,
            }]
        })
    }
    removeCol(id){
       this.setState({
           orderListMap:this.state.orderListMap.filter(item => item.id != id)
       })
    }
    addToCart(products){
        const { changeCart,cart}=this.props
        const{orders,orderListMap}=this.state
        if (orderListMap.length === 0){
            alert('請先選擇想要的商品')
            return
        }
        let newCart = cart.slice()
        for(let i in orders){
            newCart.push(orders[i])
        }
        changeCart(newCart)
        this.setState({
            orders:{},
            orderListMap:[]
        })
        alert('商品已加入購物車!')
    }
    render() {
        const { orderListMap} = this.state
        const{match, product} = this.props
        return (
            <div className="mealList_container">
                <h2 className="mealList_title">客製餐點</h2>
                <div className="mealList_title_border"></div>
                <div className="mealList_row">
                    {orderListMap.map(order => {
                        return (
                            <OrderListCol 
                                key={order.id} 
                                id={order.id} 
                                product={product} 
                                removeCol = {this.removeCol}
                                updateOrder = {this.updateOrder}
                                match = {match}
                            />
                        )
                    })}
                </div>
                <div className='button mealList_row_addCol' onClick={this.addCol}>新增</div>
                <div className="button mealList_row_toCart" onClick={this.addToCart}>加入購物車</div>
            </div>
        )
    }
}

class OrderListCol extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 1,
            size: '中碗',
            set: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        // get 預設單價、總價(因為 mount 時 api 還沒 response)
        const { product,updateOrder,id } = this.props
        const { price, num, set,size } = this.state
        if (prevProps.product !== this.props.product) {
            this.setState({
                total: product.price_m,
                price: product.price_m,
                name:product.name
            })
            // 更新 parent 的 state
            updateOrder(id,{
                name:product.name,
                set:'',
                num:1,
                size:'中碗',
                total: product.price_m
                })
        }
        //動態更新價格
        if (prevState.price !== price | prevState.num !== num | prevState.set !== set) {
            var setPrice = 0
            switch (set) {
                case '青菜套餐':
                    setPrice = 30
                    break;
                case '可樂餅套餐':
                    setPrice = 50
                    break;
                default:
                    break;
            }
            this.setState({ total: (price + setPrice) * num })
            // 更新 parent 的 state(第一個col也會執行到這個)
            updateOrder(id, {
                name: product.name,
                set: set,
                num: num,
                size: size,
                total: (price + setPrice) * num,
                img_path:product.img_path
            })
        }
    }
    // 設定動態新增的 col 的預設值
    componentDidMount() {
        const { product,match } = this.props
        console.log(this.props)
        if(match.params.type == 'other'){
            this.setState({
                total: product.price_s,
                price: product.price_s,
                name: product.name
            })
            return
        }
        this.setState({
            total: product.price_m,
            price: product.price_m,
            name: product.name
        })
    }
    handleChange(e) {
        const { product } = this.props
        //更改對應的 ui
        this.setState({
            [e.target.name]: e.target.value
        })
        switch (e.target.value) {
            case '迷你碗':
                this.setState({ price: product.price_s })
                break;
            case '中碗':
                this.setState({ price: product.price_m })
                break
            case '超值碗':
                this.setState({ price: product.price_l })
                break
            case '超大碗':
                this.setState({ price: product.price_xl })
                break
            default:
                break;
        }
    }
    
    // 刪除 col
    handleDelete(){
        const{removeCol,id} = this.props
        removeCol(id)
    }
    render() {
        const {match} = this.props
        var classForOther = null 
        if (match.params.type == 'other'){
            classForOther = 'hide'
        }
        return (
            <div>
                <div className="mealList_col">
                    <h2 className="mealList_col_name">{this.state.name}</h2>
                    <div className={`mealList_col_wrapper ${classForOther}`}>
                        <span>大小:</span>
                        <select name="size" value={this.state.size} onChange={this.handleChange}>
                            <option value="迷你碗">迷你碗</option>
                            <option value="中碗">中碗</option>
                            <option value="超值碗">超值碗</option>
                            <option value="超大碗">超大碗</option>
                        </select>
                    </div>
                    <div className={`mealList_col_wrapper ${classForOther}`}>
                        <span>套餐:</span>
                        <select name="set" value={this.state.set} onChange={this.handleChange}>
                            <option value="">無</option>
                            <option value="青菜套餐">青菜套餐</option>
                            <option value="可樂餅套餐">可樂餅套餐</option>
                        </select>
                    </div>
                    <div className='mealList_col_wrapper'>
                        <span>數量:</span>
                        <input name='num' value={this.state.num} onChange={this.handleChange} type="number" min="1" max="20" className="mealList_col_num" />
                    </div>
                    <div className='mealList_col_wrapper'>
                        <span>價格:</span>
                        <span id="mealList_col_price">{this.state.total}</span>
                    </div>
                    <i className="fa fa-close mealList_col_delete" onClick={this.handleDelete}></i>
                </div>
                
            </div>
        )
    }
}
