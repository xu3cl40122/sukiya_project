import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import React from 'react'
import ReactDOM from 'react-dom'
import provideScrollPosition from 'react-provide-scroll-position';
import { Link, withRouter } from 'react-router-dom'

class BigLogo extends React.Component {
    render() {
        return <div>
            <Link to='/'>
            <ReactCSSTransitionGroup
                transitionName="bigLogo"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                {this.props.hidden ? null : <div className="bigLogo-base"></div>}
            </ReactCSSTransitionGroup>
            </ Link>
        </div>
    }
}
class SmallLogo extends React.Component {
    render() {
        return <div>
            <Link to='/'>
            <ReactCSSTransitionGroup
                transitionName="smallLogo"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                {this.props.hidden ? null : <div className="smallLogo-base"></div>}
            </ReactCSSTransitionGroup>
            </ Link>
        </div>
    }
}
class Ani extends React.Component {
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
    componentDidUpdate(prevProps){
        const {scrollTop} = this.props
        if(prevProps.scrollTop !== scrollTop){
            if (scrollTop > 50) {
                this.setState({
                    hidden:true
                })
            }
            else{
                this.setState({
                    hidden: false
                })
            }
        }
        
    }
    
    render() {
        //console.log(this.props)
        return <div>
            <BigLogo hidden={this.state.hidden}></BigLogo>
            <SmallLogo hidden={!this.state.hidden}></SmallLogo>
        </div>;
    }
}

export const AnimatedLogo = provideScrollPosition(Ani)
