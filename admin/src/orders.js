import React from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';

function getToday(){
    return new Date().toJSON().slice(0, 10)
}

export class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            currentPage: 1,
            colPerPage: 10,
            dateFrom:'',
            dateTo:''
        }
        this.handlePage = this.handlePage.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.filterOrders = this.filterOrders.bind(this)
        this.changeOrderStatus = this.changeOrderStatus.bind(this)
    }
    componentDidMount() {
        // 取得所有訂單
        axios({
            method: 'post',
            url: 'http://localhost:3000/allOrders',
            data: this.state
        }).then((res) => {
            this.setState({
                orders: res.data
            })
        }).catch((err) => {
            alert(err)
        })
        // 設定 filter 的預設時間為當天
        this.setState({dateTo:getToday()})
    }
    changeOrderStatus(id,status){
        axios({
            method: 'put',
            url: 'http://localhost:3000/changeOrder',
            data: {
                id:id,
                status:status
            }
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            alert(err)
        })
    }
    handlePage(data) {
        this.setState({
            currentPage: (data.selected + 1)
        })
    }
    handleInput(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    filterOrders(){
        if(this.state.dateFrom === ''){
            alert('請先選擇日期區間')
            return
        }
        axios({
            method: 'post',
            url: 'http://localhost:3000/filterOrders',
            data: { from: this.state.dateFrom, to: this.state.dateTo }
        }).then((res) => {
            this.setState({
                orders: res.data
            })
        }).catch((err) => {
            alert(err)
        })
    }
    render() {
        const { orders, currentPage, colPerPage,dateFrom,dateTo } = this.state
        const indexOfLast = currentPage * colPerPage
        const indexOfFirst = indexOfLast - colPerPage
        const currentList = orders.slice(indexOfFirst, indexOfLast)
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(orders.length / colPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <div className="mainContainer">
                <div className="filterControll">
                    <div className='date_container'>
                        <span>from:</span><input name='dateFrom' type='date' value={dateFrom} onChange={this.handleInput}></input>
                        <span>to:</span><input name='dateTo' value={dateTo}type='date' onChange={this.handleInput}></input>
                        <div className='search' onClick={this.filterOrders}>Search</div>
                    </div>
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

                        {currentList.map((order, index) => {
                            return (
                                <Col key={index} order={order} changeOrderStatus={this.changeOrderStatus}/>
                            )
                        })}
                    </tbody >

                </table>
                <div>
                    <ReactPaginate
                        previousLabel={<i className='	fa fa-angle-double-left'></i>}
                        nextLabel={<i className='	fa fa-angle-double-right'></i>}
                        breakClassName={"subPage"}
                        pageCount={pageNumbers.length}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        containerClassName={"pagination"}
                        previousClassName='previous'
                        nextClassName='next'
                        pageLinkClassName={'subPage'}
                        activeClassName={"active"}
                        onPageChange={this.handlePage}
                    />
                </div>
            </div>
        )
    }
}

class Col extends React.Component {

    render() {
        const { order, changeOrderStatus } = this.props
        // 轉換 mysql datetime 格式
        let time = new Date(order.created_at).toLocaleString()
        let products = JSON.parse(order.product_list)
        var buttonClass = 'statusButton'
        //隨 status 變色
        order.status == 'done' ? buttonClass +=' statusButton-done': null
        order.status == 'doing' ? buttonClass += ' statusButton-doing' : null
        return (
            <tr>
                <td className="checkboxTD"><input type="checkbox" /></td>
                <td className="index"><div className='tofixedHeight'>{order.order_id}</div></td>
                <td>{order.name}</td>
                <td className="orderList">
                    <div className='orderList_wrapper'>
                    {products.map((product, index) => {
                        return (
                            <p key={index}>{`${product.name} ${product.size} ${product.set} * ${product.num}`}</p>
                        )
                    })}
                    </div>
                </td>
                <td>{order.total}</td>
                <td>{time}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>
                    <div className={buttonClass}>
                        <p>{order.status}</p>
                        <div className='dropdown'>
                            <div className='dropdown_row'>
                                <div className='dropdown_col' onClick={()=>{changeOrderStatus(order.order_id,'done')}}>Done</div>
                                <div className='dropdown_col' onClick={() => { changeOrderStatus(order.order_id, 'doing') }}>Doing</div>
                                <div className='dropdown_col' onClick={() => { changeOrderStatus(order.order_id, 'new') }}>New</div>
                                <div className='dropdown_col'>Remove</div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}




