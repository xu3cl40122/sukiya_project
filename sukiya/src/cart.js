import React from 'react'
import ReactDOM from 'react-dom'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
export class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        //設定 z-index 才能蓋住後面其他東西
        var modalStyles = { overlay: { zIndex: 40 } };
        return (
            <div>
                <div className='sidebar_cart_button' onClick={this.handleOpenModal}><i className='fa fa-shopping-cart'></i>購物車</div>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    style={modalStyles}
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            </div>
        );
    }
}



