import React from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Modal from 'react-responsive-modal';

var modalStyle = {
    modal: { width: '800px',padding: 0 }
}

export class Products extends React.Component{
    constructor(props){
        super(props)
        this.state={
            products:[],
            currentPage: 1,
            colPerPage: 10,
            isModalOpen:true,
        }
        this.handlePage = this.handlePage.bind(this)
        
    }
    handlePage(data) {
        this.setState({
            currentPage: (data.selected + 1)
        })
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
        const { products} = this.state
        const {currentPage, colPerPage, } = this.state
        const indexOfLast = currentPage * colPerPage
        const indexOfFirst = indexOfLast - colPerPage
        const currentList = products.slice(indexOfFirst, indexOfLast)
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / colPerPage); i++) {
            pageNumbers.push(i);
        }
        return(
            <div className="mainContainer">
                <div className="filterControll">
                    <AddProductModal />
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
                            <th className='maxCol'>Decsribe</th>
                        </tr>
                        {currentList.map((product,index)=>{
                            return(
                                <Col product={product} key={index} />
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
                <td className='describeTD'>{product.intro}</td>
            </tr>
        )
       
    }
}
class AddProductModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isModalOpen: true,
        }
        this.onOpenModal = this.onOpenModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
    }
    onCloseModal() {
        this.setState({
            isModalOpen: false
        })
    }
    onOpenModal() {
        this.setState({
            isModalOpen: true
        })
    }
    render(){
        const{isModalOpen} = this.props
        return(
            <div>
                <div className='openModal' onClick={this.onOpenModal}>New Product</div>
                <Modal open={isModalOpen} onClose={this.onCloseModal} styles={modalStyle} showCloseIcon={false} center>
                    <div className='addProduct_header'>ADD NEW PRODUCT<i className='	fa fa-close' onClick={this.onCloseModal}></i></div>
                    <div className='addProduct_body'>
                        <div className='leftBlock'>
                            <label className=''>
                                <div className='addProduct_dragInput'>
                                    <i className='	fa fa-cloud-upload'></i>
                                    <h2>Drag an image or click here to upload…</h2>
                                </div>
                                <input type='file' className='hidden' />
                            </label>
                        </div>
                        <div className='rightBlock'>
                            <form>
                                <h2>Name</h2>
                                <input type='text' />
                                <h2>Describe</h2>
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                                <h2>Price</h2>
                                <div className='rightBlock_price_row'>
                                    <div className='rightBlock_price_col'>
                                        <p>Size:</p>
                                        <select name="" id="">
                                            <option value="">迷你碗</option>
                                            <option value="">中碗</option>
                                            <option value="">超值碗</option>
                                            <option value="">超大碗</option>
                                            <option value="">one size</option>
                                        </select>
                                        <p className='rightBlock_price_col_price'>Price:</p>
                                        <input type='text' />
                                        <i className='fa fa-close'></i>
                                    </div>
                                </div>
                                <div className='addPriceCol'>Add Size</div>
                                <input type='submit' className='submit' value='Save' />
                            </form>
                        </div>

                    </div>
                </Modal>
            </div>
        )
    }
}