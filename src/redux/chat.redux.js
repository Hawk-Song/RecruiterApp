import axios from 'axios'

import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

//get char list
const MSG_LIST = 'MSG_LIST'
//read information
const MSG_RECV = 'MSG_RECV'
// mark already read
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg:[],
  users:{},
  unread:0
}

export function chat(state=initState, action) {
  switch(action.type){
    case MSG_LIST:
      return {...state, users:action.payload.users, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read && v.to===action.payload.userid).length}
    case MSG_RECV:
      const n = action.payload.to == action.userid?1:0
      return {...state, chatmsg:[...state.chatmsg, action.payload], unread:state.unread+n}
    case MSG_READ:
      return''
    default:
      return state
    
  }
}

function msgList(msgs, users, userid){
  return {type:'MSG_LIST', payload:{msgs,users, userid}}
}

function msgRecv(msg, userid){
  return {type:'MSG_RECV', payload:msg, userid}
}
export function recvMsg(){
  //when enter in chat page, start listening
  return (dispatch, getState)=>{
    socket.on('recvmsg', function(data){
      const userid = getState().user._id
      //console.log('recvmsg', data)
      dispatch(msgRecv(data, userid))
    })
  }
}

export function sendMsg({from, to, msg}){
  return dispatch=>{
    //send to backend
    socket.emit('sendmsg', {from, to, msg})
  }
}

export function getMsgList(){
  return (dispatch, getState)=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status===200 && res.data.code===0){
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}