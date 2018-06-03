import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import React from 'react'
import ReactDOM from 'react-dom'

export class Toggle extends React.Component {
    render() {
        return <div>
            <ReactCSSTransitionGroup
                transitionName="bigLogo"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                {this.props.hidden ? <div className="smallLogo-base"></div> : <div className="bigLogo-base"></div>}
            </ReactCSSTransitionGroup>
        </div>
    }
}

export class Ani extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { hidden: false };
    }

    onClick() {
        this.setState((prevState, props) => ({
            hidden: !(prevState.hidden)
        }))    //alert(ReactCSSTransitionGroup);
    }
    render() {
        return <div>
            <div onClick={this.onClick}>Click me1</div>
            <Toggle hidden={this.state.hidden}></Toggle>
        </div>;
    }
}


