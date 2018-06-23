import React from 'react'
import axios from 'axios'
export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            phone: '',
            isLogin: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.changeLogin = this.changeLogin.bind(this)
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit() {
        console.log(this.state)
        const {setLoginState} = this.props
        axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: this.state
        }).then((res)=>{
            console.log(res.data)
            if (res.data.msg == 'login_pass'){
                alert('哈囉 ' + res.data.data.name )
                setLoginState({username:res.data.data.name})
            } else if (res.data.msg == 'signup_pass'){
                alert('已創立帳號!' )
                setLoginState({username:res.data.data.name})
            } else if(res.data.msg == 'signup_fail'){
                alert('創建帳號失敗')
            } else if (res.data.msg == 'login_fail'){
                alert('帳號密碼錯誤')
            } else if (res.data.msg == 'be_used'){
                alert('該帳號已有人使用')
            } else{
                alert('error',res.data.msg)
            }
        });
    }
    changeLogin() {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }
    render() {
        const { isLogin } = this.state
        if (isLogin) {
            return (
                <div className='login_body'>
                    <div className="login_bg"></div>
                    <div className="login_container">
                        <div className='login_img'>
                            <h2>Login and enjoy<br />best Risotto <br />in the word!</h2>
                        </div>
                        <div className='login_formContainer'>

                            <h2 className='login_formContainer_title'>Login</h2>
                            <div className='login_formContainer_inputBox'>
                                <input type="text" placeholder='Email' name='email' onChange={this.handleChange} />
                            </div>
                            <div className='login_formContainer_inputBox'>
                                <input type="password" placeholder='Password' name='password' onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className='login_formContainer_bottomNav'>
                            <div className='login_formContainer_bottomNav_change' onClick={this.changeLogin}>Sign up</div>
                            <div className='login_formContainer_bottomNav_submit' onClick={this.submit}>Submit</div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className='login_body'>
                    <div className="login_bg"></div>
                    <div className="login_container">
                        <div className='login_img'>
                            <h2>Login and enjoy<br />best Risotto <br />in the word!</h2>
                        </div>
                        <div className='login_formContainer'>

                            <h2 className='login_formContainer_title'>SIGN UP</h2>
                            <div className='login_formContainer_inputBox'>
                                <input type="text" placeholder='Email' name='email' onChange={this.handleChange} />
                            </div>
                            <div className='login_formContainer_inputBox'>
                                <input type="password" placeholder='Password' name='password' onChange={this.handleChange} />
                            </div>
                            <div className='login_formContainer_inputBox'>
                                <input type="text" placeholder='Name' name='name' onChange={this.handleChange} />
                            </div>
                            <div className='login_formContainer_inputBox'>
                                <input type="text" placeholder='Phone' name='phone' onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className='login_formContainer_bottomNav'>
                            <div className='login_formContainer_bottomNav_change' onClick={this.changeLogin}>Login</div>
                            <div className='login_formContainer_bottomNav_submit' onClick={this.submit}>Submit</div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}