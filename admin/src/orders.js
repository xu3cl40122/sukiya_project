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
                            <tr>
                                <td className="checkboxTD"><input type="checkbox" /></td>
                                <td className="index">1</td>
                                <td>Tom</td>
                                <td className="orderList">
                                    <p>牛丼 大碗 *2</p>
                                    <p>三層起司牛丼 超值碗*10</p>
                                </td>
                                <td>$2550</td>
                                <td>2018/6/24</td>
                                <td>新北市板橋區圈圈路三段9487號87樓</td>
                                <td>0978978985</td>
                                <td><div className="statusButton">Paid</div></td>
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
        return(
            <tr>
                <td className="checkboxTD"><input type="checkbox" /></td>
                <td className="index">1</td>
                <td>{order.name}</td>
                <td className="orderList">
                    <p>牛丼 大碗 *2</p>
                    <p>三層起司牛丼 超值碗*10</p>
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




