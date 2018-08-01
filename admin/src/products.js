import React from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';

export class Products extends React.Component{
    constructor(props){
        super(props)
        this.state={
            products:[]
        }
    }
    componentDidMount(){
        // 取得所有訂單
        axios({
            method: 'post',
            url: 'http://localhost:3000/backProducts',
            data: this.state
        }).then((res) => {
            this.setState({
                products: res.data
            })
        }).catch((err) => {
            alert(err)
        })
    }
    render(){
        const{products} = this.state
        return(
            <div className="mainContainer">
                <div className="filterControll">
                    
                </div>
                <table className="mainTable">
                    <tbody>
                        <tr className="firstRow">
                            <th className="checkboxTD"><input type="checkbox" /></th>
                            <th>Product_id</th>
                            <th>Name</th>
                            <th>Img</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Decsribe</th>
                        </tr>
                        {products.map((product,index)=>{
                            return(
                                <Col product={product} key={index} />
                            )
                        })}
                       
                    </tbody >

                </table>
                <div>
                    
                </div>
            </div>
        )
    }
}

class Col extends React.Component{
    render(){
        const{product} = this.props
        return(
            <tr>
                <td className="checkboxTD"><input type="checkbox" /></td>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td><img src={product.img_path} alt=""/></td>
                <td>{product.type}</td>
                <td></td>
                <td>{product.intro}</td>
            </tr>
        )
       
    }
}