import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {login}
)
class Login extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user:'',
      pwd:''
    }
    //why not use arrow function
    //arrow function will pasa new object every time
    //bind this just old one, so a litter performance improvement
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleChange(key, val){
    this.setState({
      [key]:val
    })
  }
  register(){
    console.log(this.props)
    this.props.history.push('/register')
  }
  handleLogin(){
    this.props.login(this.state)
  }
  render(){
    return (
      <div>
        {(this.props.redirectTo&&this.props.redirectTo!='/login')?<Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        <h2>Login Page</h2>
        <WingBlank>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.handleChange('user', v)}>Username</InputItem>
            <InputItem onChange={v=>this.handleChange('pwd', v)} type='password'>Password</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type='primary'>Login</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login