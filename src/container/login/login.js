import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
class Login extends React.Component {
  constructor(props){
    super(props)
    //why not use arrow function
    //arrow function will pasa new object every time
    //bind this just old one, so a litter performance improvement
    this.register = this.register.bind(this)
  }
  register(){
    console.log(this.props)
    this.props.history.push('/register')
  }
  render(){
    return (
      <div>
        <Logo></Logo>
        <h2>Login Page</h2>
        <WingBlank>
          <List>
            <InputItem>Username</InputItem>
            <InputItem>Password</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary'>Login</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login