import React from 'react'
import ReactDOM from 'react-dom'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
export class ExampleApp extends React.Component {
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
        var modalStyles = { overlay: { zIndex: 40 } };
        return (
            <div className="product_container bgPink" >
            <div>
                <button onClick={this.handleOpenModal}>Trigger Modal</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    style={modalStyles}
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            </div>
            </div>
        );
    }
}



