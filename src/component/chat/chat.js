import React from 'react'
import {List, InputItem, NavBar, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import io from 'socket.io-client'
import {getChatId} from '../../util'

//const socket = io('ws://localhost:9093')

@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {text:'', msg:[]}
  }
  componentDidMount(){
    // this.props.getMsgList()
    // this.props.recvMsg()
    // socket.on('recvmsg', (data)=>{
    //   this.setState({
    //     msg:[...this.state.msg, data.text]
    //   })
    // })
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    }, 0)
    
  }

  componentWillUnmount(){
    //tell system, this message has been read
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }

  handleSubmit(){
    //socket.emit('sendmsg', {text:this.state.text})
    this.setState({text:''})
    //console.log(this.state)
    const from = this.props.user._id
    //parameter from url
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text:''})
  }
  
  render(){
    const userid =this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if(!users[userid]){
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
    return (
      <div id='chat-page'>
        <NavBar 
          mode='dark' 
          icon={<Icon type='left'/>}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v=>{
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from===userid?(
            <List key={v._id}>
              <Item
                thumb={avatar}
              >{v.content}</Item>
            </List>
          ):(
            <List key={v._id}>
              <Item 
                extra={<img src={avatar} alt=''/>}
                className='chat-me'
              >{v.content}</Item>
            </List>
          )
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
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat