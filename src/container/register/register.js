import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'


class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type:'genius'
    }
  }

  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <h2>Register Page</h2>
        <List>
            <InputItem>Username</InputItem>
            <InputItem>Password</InputItem>
            <InputItem>Comfirm Password</InputItem>
            <RadioItem checked={this.state.type==='genius'}>Genuis</RadioItem>
            <RadioItem checked={this.state.type==='boss'}>Boss</RadioItem>
            <Button type='primary'>Register</Button>
        </List>
      </div>
    )
  }
}

export default Register