import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import React from 'react'
import ReactDOM from 'react-dom'
import provideScrollPosition from 'react-provide-scroll-position';
import { Link, withRouter } from 'react-router-dom'
import ReactTimeout from 'react-timeout'
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
        this.state = { 
            hidden: false, // 大的logo是否被藏起來
            changeing:false,
        };
        this.changeLogoTo = this.changeLogoTo.bind(this)
    }
    onClick() {
        this.setState((prevState, props) => ({
            hidden: !(prevState.hidden)
        }))    
    }
    changeLogoTo(size){
        if(size == 'small'){
            this.setState({ hidden: true, changeing: true }, () => { this.props.setTimeout(() => { this.setState({ changeing: false }) }, 2000) })
        }
        else{
            this.setState({ hidden: false, changeing: true }, () => { this.props.setTimeout(() => { this.setState({ changeing: false }) }, 2000) })
        } 
    }
    componentDidUpdate(prevProps,prevState){
        const {scrollTop} = this.props
        const sp = 30
        /*
        if (scrollTop > sp && this.state.hidden == false){
            this.changeLogoTo('small')
        }
        if(scrollTop < sp){
            setTimeout(() => {
                if (scrollTop <= sp && this.state.hidden == true){
                    this.changeLogoTo('big')
                }
            }, 1000);
        }
        */
        
        // 預防快速上下產生明明沒在頂 卻是大 logo 的情況
        if (prevState.hidden == false & prevState.changeing == true & this.state.changeing == false & scrollTop > sp){
            this.changeLogoTo('small')
        }
        // 預防快速上下產生明明在捲到頂卻沒變回大 logo的情況
        if (scrollTop < sp & prevState.changeing == true & this.state.hidden == true & this.state.changeing == false){
            this.changeLogoTo('big')
        }
        // 用 settimeout 切換動畫是否正在執行，避免同時載入大小 logo
        if(prevProps.scrollTop !== scrollTop & this.state.changeing != true){
            //console.log('in',prevState)
           
            if (scrollTop > sp & this.state.hidden == false) {
                this.changeLogoTo('small')              
            }
            else if (scrollTop < sp & this.state.hidden == true){
                this.changeLogoTo('big')            }
        }
        
        
       
        
    }
    
    render() {
        return <div>
            <BigLogo hidden={this.state.hidden}></BigLogo>
            <SmallLogo hidden={!this.state.hidden}></SmallLogo>
        </div>;
    }
}

export const AnimatedLogo = ReactTimeout(provideScrollPosition(Ani))
