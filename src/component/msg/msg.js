import React from 'react'
import {connect} from 'react-redux'

@connect(
  state=>state
)
class Msg extends React.Component{

  render(){
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      //group coording to id
      msgGroup[v.chatid].push(v)
    });
    return (
      <div>
        <h2>messagelist</h2>
      </div>
    )
  }
}
export default Msg