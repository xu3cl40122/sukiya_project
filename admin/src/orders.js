import React from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'
import axios from 'axios'

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

export class Orders extends React.Component {
    constructor(props){
        super(props)
        this.state={
            orders:[]
        }
    }
    componentDidMount(){
        axios({
            method: 'post',
            url: 'http://localhost:3000/allOrders',
            data: this.state
        }).then((res)=>{
            console.log(res.data)
            this.setState({
                orders:res.data
            })
        }).catch((err)=>{
            alert(err)
        })
    }
    render() {
        const{orders} = this.state
        return (
            <div className="mainContainer">
                <div className="stateControll">
                    <div className="stateControll_select">
                        <div>EDIT SECTION</div>
                    </div>
                    <table className="mainTable">
                        <tbody>
                            <tr className="firstRow">
                                <th className="checkboxTD"><input type="checkbox" /></th>
                                <th className="index">order_id</th>
                                <th>Customer</th>
                                <th className="bigCol">Product List</th>
                                <th>Total</th>
                                <th>Order Time</th>
                                <th className="bigCol">Address</th>
                                <th>Phone</th>
                                <th>Status</th>
                            </tr>
                           
                            {orders.map((order,index)=>{
                                return(
                                    <Col key={index} order={order} />
                                )
                            })}
                        </tbody >
                    </table>
                </div>
            </div>
        )
    }
}

class Col extends React.Component{
    
    render(){
        const { order } = this.props
        // 轉換 mysql datetime 格式
        let time = new Date(order.created_at).toLocaleString()
        let products = JSON.parse(order.product_list)
        console.log(products)
        return(
            <tr>
                <td className="checkboxTD"><input type="checkbox" /></td>
                <td className="index">1</td>
                <td>{order.name}</td>
                <td className="orderList">
                    {products.map((product,index)=>{
                        return(
                            <p key={index}>{`${product.name} ${product.set} * ${product.num}`}</p>
                        )
                    })}
                </td>
                <td>{order.total}</td>
                <td>{time}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td><div className="statusButton">{order.status}</div></td>
            </tr>
        )
    }
}




