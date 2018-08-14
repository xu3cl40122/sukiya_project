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
                            <th className='index'>Product_id</th>
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
                <td><div className='tofixedHeight'>{product.product_id}</div></td>
                <td>{product.name}</td>
                <td><img src={product.img_path} alt=""/></td>
                <td>{product.type}</td>
                <td>
                    {product.type == 'other'? product.price_s:null}
                    {product.type == 'bowl' ? <div><p>{`迷你碗: ${product.price_s}`}</p><p>{`中碗: ${product.price_m}`}</p><p>{`超值碗: ${product.price_l}`}</p><p>{`超大碗: ${product.price_xl}`}</p></div>:null}
                    {product.type == 'curry' ? <div><p>{`迷你碗: ${product.price_s}`}</p><p>{`中碗: ${product.price_m}`}</p><p>{`超值碗: ${product.price_l}`}</p></div> : null}
                </td>
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
            isOneSize:false,
            name:"",
            describe:"",
            img:'',
            s:'',
            m:'',
            l:'',
            xl:''
        }
        this.onOpenModal = this.onOpenModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.switchSizeNum = this.switchSizeNum.bind(this)
        this.handleImgChange = this.handleImgChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
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
    handleInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        this.uploadFile()
    }
    switchSizeNum(){
        this.setState({
            isOneSize:!this.state.isOneSize
        })
    }
    handleImgChange(e){
        this.setState({
            img:e.target.files[0]
        })
    }
    uploadFile(){
        var formData = new FormData()
        formData.append('myFile',this.state.img,this.state.img.name)
        axios({
            method: 'post',
            url: 'http://localhost:3000/upload',
            data: formData
        }).then((res)=>{
            console.log(res.data)
        })
    }
    render(){
        const{isModalOpen,name,describe,isOneSize,img} = this.state
        var sizeList = [{ ch: '迷你碗', en: 's' }, { ch: '中碗', en: 'm' }, { ch: '超值碗', en: 'l' }, { ch: '超大碗', en: 'xl' }]
        if(isOneSize){
            var sizeList = []
        }
        console.log(img)
        return(
            <div>
                <div className='openModal' onClick={this.onOpenModal}>New Product</div>
                <Modal open={isModalOpen} onClose={this.onCloseModal} styles={modalStyle} showCloseIcon={false} closeOnOverlayClick={false}center>
                    <div className='addProduct_header'>ADD NEW PRODUCT<i className='	fa fa-close' onClick={this.onCloseModal}></i></div>
                    <div className='addProduct_body'>
                        <div className='leftBlock'>
                            <label className=''>
                                <div className='addProduct_dragInput'>
                                    <i className='	fa fa-cloud-upload'></i>
                                    <h2>Drag an image or click here to upload…</h2>
                                </div>
                                <input type='file' className='hidden' onChange={this.handleImgChange}/>
                            </label>
                            <div className='leftBlock_preview'>
                                <img src='./dscf5328.jpg' />
                            </div>
                        </div>
                        <div className='rightBlock'>
                            <form onSubmit={this.handleSubmit}>
                                <h2>Name</h2>
                                <input type='text' name='name' onChange={this.handleInput} value={name} required/>
                                <h2>Describe</h2>
                                <textarea  name='describe' onChange={this.handleInput} value={describe} required></textarea>
                                <h2>Price</h2>
                                {sizeList.map((size,index)=>{
                                    return(
                                            <div className='rightBlock_price_col' key={index}>
                                                <p>{size.ch}</p>
                                                <input name={size.en} type='text' pattern='[0-9]*|null' onChange={this.handleInput} value={this.state[size.en]}/>
                                            </div>
                                    )
                                })}
                                {isOneSize ? <div className='rightBlock_price_col'><p>價格:</p><input name='s' type='text' pattern='[0-9]*|null' onChange={this.handleInput} value={this.state.s} /></div>:null}
                                <div className='changeSize' onClick={this.switchSizeNum}>One Size</div>
                                <input type='submit' className='submit' value='Save'/>
                            </form>
                        </div>

                    </div>
                </Modal>
            </div>
        )
    }
}
