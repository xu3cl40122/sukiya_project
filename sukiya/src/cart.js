import React from 'react'
import Modal from 'react-responsive-modal';
import axios from 'axios'

var modalStyle = {
    modal:{width:'800px'}
}
export  class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,//modal open
            total:0,
            checkedorder:false, //是否進入訂單資訊業面
            phone:'',
            address:'',
            other_need:''
            //change:0 檢查是否有更新 state 但好像沒用了
            
        }
        this.onOpenModal = this.onOpenModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.calTotal = this.calTotal.bind(this)
        this.changeTotal = this.changeTotal.bind(this)
        this.toChecked = this.toChecked.bind(this)
        this.sendOrder = this.sendOrder.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.total = 0
    }
    inputChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onOpenModal(){
        this.setState({ open: true });
    };

    onCloseModal(){
        this.setState({ open: false });
    };
    // 好像沒有在 render 那邊 call 就不用 bind(this)?
    calTotal(){
        const{cart} = this.props
        var tempTotal = 0
        cart.forEach((product)=>{
            tempTotal += product.total 
        })
        return tempTotal
    }
    changeTotal(price){
        this.setState({
            total:this.state.total + price
        })
    }
    handleDelete(id){
        const { cart, deleteFromCart} = this.props
        this.setState({
            change: ++this.state.change
        })
        cart.splice(id,1)
        deleteFromCart(cart)
        
    }
    toChecked(){
        if(this.props.cart.length == 0){
            alert('購物車內沒有商品')
            return
        }
        this.setState({
            checkedorder:true
        })
    }
    sendOrder(){
        const { userState,cart} = this.props
        if(userState.username == ''){
            alert('請先登入帳號再進行訂購')
            return 
        }
        var order = {
            user_id:userState.user_id,
            username:userState.username,
            products:JSON.stringify(cart),
            total:this.total,
            phone:this.state.phone,
            address:this.state.address,
            other_need:this.state.other_need
        }
        axios({
            method: 'post',
            url: 'http://localhost:3000/catchOrder',
            data: order
        }).then((res)=>{
            if(res.data == 'pass'){
                alert('訂餐成功')
                return
            }
            alert(res.data)
            
        })
    }
    render() {
        const { open } = this.state;
        const {cart} = this.props
        this.total = this.calTotal()
        // 購物車
        if(!this.state.checkedorder){
            return (
                <div>
                    <div onClick={this.onOpenModal} className='sidebar_cart_button'><i className="fa fa-shopping-cart"></i>購物車</div>
                    <Modal open={open} onClose={this.onCloseModal} styles={modalStyle} center>
                        <div className='modalContainer'>
                            <h2 className='modal_title'>SHOPPING CART</h2>
                            <div className='modal_title_border'></div>
                            <div className='modal_row'>
                                <div className='modal_row_firstLine'></div>
                                {cart.map((product, index) => {
                                    return (
                                        <ModalCol
                                            key={index}
                                            id={index}
                                            product={product}
                                            handleDelete={this.handleDelete}
                                        />
                                    )
                                })}
                                {cart.length == 0 ? <h2>購物車內沒有商品</h2>:null}
                            </div>
                            <div className='modal_totalContainer'>
                                <h2>合計: </h2><h2>{this.total}</h2>
                                <div className='button modal_buyButton' onClick={this.toChecked}>已確認商品</div>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        }
        // 訂單資訊
        return(
            <div>
                <div onClick={this.onOpenModal} className='sidebar_cart_button'><i className="fa fa-shopping-cart"></i>購物車</div>
                <Modal open={open} onClose={this.onCloseModal} styles={modalStyle} center>
                    <div className='modalContainer'>
                        <h2 className='modal_title'>訂單資訊</h2>
                        <div className='modal_title_border'></div>
                        <div className='modal_formContainer'>
                            <div className='left'>
                                <div className='modal_inputBox'>
                                    <input type="text" placeholder='送餐地址' name='address' onChange={this.inputChange} />
                                </div>
                                <div className='modal_inputBox'>
                                    <input type="text" placeholder='聯絡電話' name='phone' onChange={this.inputChange} />
                                </div>
                            </div>
                            <div className='right'>
                                <h2>其他需求</h2>
                                <textarea name="other_need" id="" value={this.state.other_need} onChange={this.inputChange}></textarea>
                            </div>
                           
                        </div>
                       
                        <div className='modal_totalContainer-forChecked '>
                            <div className='button modal_buyButton modal_buyButton-back' onClick={()=>{this.setState({checkedorder:false})}} >回上一頁</div>
                            <div className='rightBlock'>
                                <h2>合計: </h2><h2>{this.total}</h2>
                                <div className='button modal_buyButton' onClick={this.sendOrder}>送出訂單!</div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
        
        
    }
}

class ModalCol extends React.Component{
    constructor(props){
        super(props)
        this.state={}
        this.deleteProduct = this.deleteProduct.bind(this)
    }

    deleteProduct(){
        const { handleDelete,id} = this.props
        let toDelete = confirm('確定刪除商品?')
        if(toDelete){handleDelete(id)}
    }
    
    render(){
        const{product} = this.props
        return(
            <div className='modal_col'>
                <img src={product.img_path} alt="" />
                <div className='modal_col_nameContainer'>
                    <p className='modal_col_productName'>{product.name}</p>
                    <p>{product.size}</p>
                </div>
                <p className='modal_col_setName'>{'+ ' + product.set}</p>
                <p className='modal_col_num'>{'x' + product.num}</p>
                <p className='modal_col_price'>{'$' + product.total}</p>
                <i className='fa fa-close modal_col_close' onClick={this.deleteProduct}></i>
            </div>
        )
    }
}