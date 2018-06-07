import React from 'react'
import io from 'socket.io-client'
import {List, InputItem} from 'antd-mobile'

const socket = io('ws://localhost:9093')

class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {text:'', msg:[]}
  }
  componentDidMount(){
    socket.on('recvmsg', (data)=>{
      this.setState({
        msg:[...this.state.msg, data.text]
      })
    })
  }
  handleSubmit(){
    socket.emit('sendmsg', {text:this.state.text})
    this.setState({text:''})
    console.log(this.state)
  }
  render(){
    console.log(this.props)
    return (
      <div>
        {this.state.msg.map(v=>{
          return <p key={v}>{v}</p>
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='input here'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={<span onClick={()=>this.handleSubmit()}>send</span>}
            >
              message
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat