import React from 'react'
import Modal from 'react-responsive-modal';
import axios from 'axios'

var modalStyle = {
    modal: { width: '800px', }
}
export class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,//modal isOpen
            checkedorder: false, //是否進入訂單資訊業面
            phone: '',
            address: '',
            other_need: ''
        }
        this.onOpenModal = this.onOpenModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.calTotal = this.calTotal.bind(this)
        this.toChecked = this.toChecked.bind(this)
        this.sendOrder = this.sendOrder.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.backToCheckOrder = this.backToCheckOrder.bind(this)
        this.total = 0 //計算總價
    }
    inputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onOpenModal() {
        this.setState({ isOpen: true });
    };

    onCloseModal() {
        this.setState({ isOpen: false });
    };
    // 好像沒有在 render 那邊 call 就不用 bind(this)?
    calTotal() {
        const { cart } = this.props
        var tempTotal = 0
        cart.forEach((product) => {
            tempTotal += product.total
        })
        return tempTotal
    }

    handleDelete(id) {
        const { cart, changeCart } = this.props
        let newCart = cart.slice()
        newCart.splice(id, 1)
        changeCart(newCart)

    }
    toChecked() {
        if (this.props.cart.length == 0) {
            alert('購物車內沒有商品')
            return
        }
        this.setState({
            checkedorder: true
        })
    }
    sendOrder() {
        const { userState, cart, sendOrder } = this.props
        if (userState.username == undefined) {
            alert('請先登入帳號再進行訂購')
            return
        }
        var order = {
            user_id: userState.user_id,
            username: userState.username,
            products: JSON.stringify(cart),
            total: this.total,
            phone: this.state.phone,
            address: this.state.address,
            other_need: this.state.other_need
        }
        sendOrder(order)
    }
    backToCheckOrder(){
        this.setState({
            checkedorder: false 
        })
    }
    componentDidUpdate(prevProps, prevState) {
        const { sendOrderRes, changeCart } = this.props
        if (sendOrderRes == prevProps.sendOrderRes){
            console.log('same')
        }
        if (sendOrderRes !== prevProps.sendOrderRes) {
            console.log(sendOrderRes, prevProps.sendOrderRes,this.state,prevState )
        }
    }
    render() {
        const { isOpen, other_need } = this.state;
        const { cart } = this.props
        this.total = this.calTotal()//計算 total
        // 購物車
        if (!this.state.checkedorder) {
            return (
                <div>
                    <div onClick={this.onOpenModal} className='sidebar_cart_button'><i className="fa fa-shopping-cart"></i>購物車</div>
                    <Modal_page1
                        onCloseModal={this.onCloseModal}
                        isOpen={isOpen}
                        cart={cart}
                        handleDelete={this.handleDelete}
                        total={this.total}
                        toChecked={this.toChecked}
                    />
                    
                </div>
            );
        }
        // 訂單資訊
        return (
            <div>
                <div onClick={this.onOpenModal} className='sidebar_cart_button'><i className="fa fa-shopping-cart"></i>購物車</div>
                <Modal_page2 
                    isOpen={isOpen}
                    onCloseModal={this.onCloseModal}
                    inputChange={this.inputChange}
                    other_need={other_need}
                    sendOrder={this.sendOrder}
                    backToCheckOrder={this.backToCheckOrder}
                    total={this.total}
                />
                
            </div>
        )
    }
}
class Modal_page1 extends React.Component {
    render() {
        const { onCloseModal, isOpen, cart, handleDelete, total, toChecked } = this.props
        return (
            <Modal open={isOpen} onClose={onCloseModal} classNames={{ 'modal': 'modalClass'}}center>
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
                                    handleDelete={handleDelete}
                                />
                            )
                        })}
                        {cart.length == 0 ? <h2>購物車內沒有商品</h2> : null}
                    </div>
                    <div className='modal_totalContainer'>
                        <h2>合計: </h2><h2>{total}</h2>
                        <div className='button modal_buyButton' onClick={toChecked}>已確認商品</div>
                    </div>
                </div>
            </Modal>
        )
    }
}

class Modal_page2 extends React.Component{
    render(){
        const { isOpen, onCloseModal, inputChange, other_need, sendOrder, backToCheckOrder, total} = this.props
        return(
            <Modal open={isOpen} onClose={onCloseModal} styles={modalStyle} center>
                <div className='modalContainer'>
                    <h2 className='modal_title'>訂單資訊</h2>
                    <div className='modal_title_border'></div>
                    <div className='modal_formContainer'>
                        <div className='left'>
                            <div className='modal_inputBox'>
                                <input type="text" placeholder='送餐地址' name='address' onChange={inputChange} />
                            </div>
                            <div className='modal_inputBox'>
                                <input type="text" placeholder='聯絡電話' name='phone' onChange={inputChange} />
                            </div>
                        </div>
                        <div className='right'>
                            <h2>其他需求</h2>
                            <textarea name="other_need" id="" value={other_need} onChange={inputChange}></textarea>
                        </div>
                    </div>
                    <div className='modal_totalContainer-forChecked '>
                        <div className='button modal_buyButton modal_buyButton-back' onClick={backToCheckOrder} >回上一頁</div>
                        <div className='rightBlock'>
                            <h2>合計: </h2><h2>{total}</h2>
                            <div className='button modal_buyButton' onClick={sendOrder}>送出訂單!</div>
                        </div>
                    </div>
                    <div className='modal_prePage' onClick={backToCheckOrder}><i className='fa fa-angle-double-left'></i></div>
                </div>
            </Modal>
        )
    }
}


class ModalCol extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.deleteProduct = this.deleteProduct.bind(this)
    }

    deleteProduct() {
        const { handleDelete, id } = this.props
        let toDelete = confirm('確定刪除商品?')
        if (toDelete) { handleDelete(id) }
    }

    render() {
        const { product } = this.props
        return (
            <div className='modal_col'>
                <img src={product.img_path} alt="" />
                <div className='modal_col_nameContainer'>
                    <span className='modal_col_productName'>{product.name}</span>
                    <span>{product.size}</span>
                    <span className=''>{product.set == '' ? '' : '+ ' + product.set}</span>
                </div>
                <span className=''>{'x' + product.num}</span>
                <span id='modal_col_price'>{'$' + product.total}</span>
                <i className='fa fa-close modal_col_close' onClick={this.deleteProduct}></i>
            </div>
        )
    }
}