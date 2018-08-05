import React from 'react'
import axios from 'axios'

// 讓 axios 帶 cookie (預設不會帶)
//axios.defaults.withCredentials = true
export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            phone: '',
            isLogin: true// 切換 login 或 sing up
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
    submit(e) {
        const { login } = this.props
        e.preventDefault()
        login(this.state)
    }
    componentDidUpdate(prevProps,prevState){
        const { loginResponse, setLoginState} = this.props
        if (loginResponse != prevProps.loginResponse){
            switch (loginResponse.msg){
                case 'login_pass':
                    alert(`Hello ${loginResponse.data.name} !`)
                    setLoginState({
                        username: loginResponse.data.name,
                        user_id: loginResponse.data.user_id
                    })
                    break
                case 'signup_pass':
                    alert('申請帳號成功!')
                    setLoginState({
                        username: loginResponse.data.name,
                        user_id: loginResponse.data.user_id
                    })
                    break
                case 'signup_fail':
                    alert('申請帳號失敗')
                    break 
                case 'login_fail':
                    alert('帳號密碼錯誤')
                    break 
                case 'be_used':
                    alert('該信箱已有人使用')
                    break 
                default:
                    alert(loginResponse.msg)
            }
        }
        
    }
    // 切換登入 or 註冊頁面
    changeLogin() {
        this.setState({
            isLogin: !this.state.isLogin,
            email: '',
            password: '',
            name: '',
            phone: '',
        })
    }
    render() {
        const { isLogin } = this.state
        if (isLogin) {
            // login page
            return (
                <div className='login_body'>
                    <div className="login_bg"></div>
                    <div className="login_container">
                        <div className='login_img'>
                            <h2>Login and enjoy<br />best Risotto <br />in the word!</h2>
                        </div>
                        <form onSubmit={this.submit}>
                            <div className='login_formContainer'>

                                <h2 className='login_formContainer_title'>Login</h2>
                                <div className='login_formContainer_inputBox'>
                                    <input type="text" placeholder='Email' name='email' onChange={this.handleChange} value={this.state.email} required />
                                </div>
                                <div className='login_formContainer_inputBox'>
                                    <input type="password" placeholder='Password' name='password' onChange={this.handleChange} value={this.state.password} required />
                                </div>
                            </div>
                            <div className='login_formContainer_bottomNav'>
                                <div className='login_formContainer_bottomNav_change' onClick={this.changeLogin}>Sign up</div>
                                <input type="submit" className='login_formContainer_bottomNav_submit ' value='Submit' />
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else {
            // sign up page
            return (
                <div className='login_body'>
                    <div className="login_bg"></div>
                    <div className="login_container">
                        <div className='login_img'>
                            <h2>Login and enjoy<br />best Risotto <br />in the word!</h2>
                        </div>
                        <form onSubmit={this.submit}>
                            <div className='login_formContainer'>

                                <h2 className='login_formContainer_title'>SIGN UP</h2>
                                <div className='login_formContainer_inputBox'>
                                    <input type="email" placeholder='Email' name='email' onChange={this.handleChange} value={this.state.email} required/>
                                </div>
                                <div className='login_formContainer_inputBox'>
                                    <input type="password" placeholder='Password' name='password' onChange={this.handleChange} value={this.state.password} required/>
                                </div>
                                <div className='login_formContainer_inputBox'>
                                    <input type="text" placeholder='Name' name='name' onChange={this.handleChange} value={this.state.name} required/>
                                </div>
                                <div className='login_formContainer_inputBox'>
                                    <input type="text" placeholder='Phone' name='phone' onChange={this.handleChange} value={this.state.phone} required/>
                                </div>
                            </div>
                            <div className='login_formContainer_bottomNav'>
                                <div className='login_formContainer_bottomNav_change' onClick={this.changeLogin}>Login</div>
                                <input type="submit" className='login_formContainer_bottomNav_submit ' value='Submit'  />
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}