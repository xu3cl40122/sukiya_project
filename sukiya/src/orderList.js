import React from 'react'
import ReactDOM from 'react-dom'
export class OrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderListMap: [{ id: 0 }],
            orders:{}
        }
        this.addCol = this.addCol.bind(this)
        this.removeCol = this.removeCol.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
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
    render() {
        const { orderListMap } = this.state
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
                                product={this.props.product} 
                                removeCol = {this.removeCol}
                                updateOrder = {this.updateOrder}
                            />
                        )
                    })}
                </div>
                <div className='button mealList_row_addCol' onClick={this.addCol}>新增</div>
                <div className="button mealList_row_toCart">加入購物車</div>
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
            set: '無',
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
            })
            // 更新 parent 的 state
            updateOrder(id,{
                name:product.name,
                set:'無',
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
            updateOrder(id, {
                name: product.name,
                set: set,
                num: num,
                size: size,
                total: (price + setPrice) * num
            })
        }
    }
    // 設定動態新增的 col 的預設值
    componentDidMount() {
        const { product } = this.props
        this.setState({
            total: product.price_m,
            price: product.price_m,
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
        console.log(id)
        removeCol(id)
    }
    render() {
        return (
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
                    <option value="無">無</option>
                    <option value="青菜套餐">青菜套餐</option>
                    <option value="可樂餅套餐">可樂餅套餐</option>
                </select>
                <p>數量:</p>
                <input name='num' value={this.state.num} onChange={this.handleChange} type="number" min="1" max="20" className="mealList_col_num" />
                <p>價格:</p>
                <span className="mealList_col_price">{this.state.total}</span>
                <i className="fa fa-close mealList_col_delete" onClick={this.handleDelete}></i>
            </div>
        )
    }
}