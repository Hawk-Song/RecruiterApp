import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {register}
)
class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type:'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key, val){
    this.setState({
      [key]:val
    })
  }
  handleRegister(){
    this.props.register(this.state)
  }

  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        <h2>Register Page</h2>
        <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.handleChange('user', v)}>Username</InputItem>
            <InputItem onChange={v=>this.handleChange('pwd', v)}>Password</InputItem>
            <InputItem onChange={v=>this.handleChange('repeatpwd', v)}>Cfm Pwd</InputItem>
            <RadioItem checked={this.state.type==='genius'}
              onChange={()=>this.handleChange('type', 'genius')}
            >Genuis</RadioItem>
            <RadioItem checked={this.state.type==='boss'}
              onChange={()=>this.handleChange('type', 'boss')}
            >Boss</RadioItem>
            <Button type='primary' onClick={this.handleRegister}>Register</Button>
        </List>
      </div>
    )
  }
}

export default Register