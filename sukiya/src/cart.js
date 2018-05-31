import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-responsive-modal';

var modalStyle = {
    modal:{width:'800px'}
}
export  class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,
            total:0,
            change:0
        }
        this.onOpenModal = this.onOpenModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.calTotal = this.calTotal.bind(this)
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
        this.setState({
            total: tempTotal
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

    componentDidUpdate(prevProps,prevState){
        console.log(777)
        console.log(this.props.cart)
        if(prevProps !== this.props){
            this.calTotal()
        }
    }

    render() {
        const { open } = this.state;
        const {cart} = this.props
        return (
            <div>
                <div onClick={this.onOpenModal} className='sidebar_cart_button'><i className="fa fa-shopping-cart"></i>購物車</div>
                <Modal open={open} onClose={this.onCloseModal} styles={modalStyle} center>
                    <div className='modalContainer'>
                        <h2 className='modal_title'>SHOPPING CART</h2>
                        <div className='modal_title_border'></div>
                        <div className='modal_row'>
                            <div className='modal_row_firstLine'></div>
                            {cart.map((product,index )=>{return(
                                <ModalCol key={index} id={index} product={product} handleDelete={this.handleDelete} />
                            )})}
                            
                        </div>
                        <div className='modal_totalContainer'>
                            <h2>合計: </h2><h2>{this.state.total}</h2>
                            <div className='button modal_buyButton'>確認訂購!</div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
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
        handleDelete(id)
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