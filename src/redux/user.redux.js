import axios from 'axios'
import {getRedirectPath} from '../util'


const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState={
  redirectTo:'',
  msg:'',
  user:'',
  pwd:'',
  type:''
}

//reducer
//must have initState, otherwise error
export function user(state=initState, action){
  switch(action.type){
    case AUTH_SUCCESS:
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload), ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }  
}

function authSuccess(data){
  return {type:AUTH_SUCCESS, payload:data}
}
export function loadData(userinfo){
  return {type:LOAD_DATA, payload:userinfo}
}

export function update(data){
  return dispatch=>{
    axios.post('/user/update', data)
    .then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

function errorMsg(msg){
  //actually {msg:msg, type:ERROR_MSG},
  //but msg is variable, so we can write it shortly
  return {msg, type:ERROR_MSG}
}



export function login({user, pwd}){
  if(!user || !pwd) {
    return errorMsg('must provide username and password')
  }
  return dispatch=>{
    axios.post('/user/login', {user, pwd})
      .then(res=>{
        if(res.status===200&&res.data.code===0){
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
//{user, pwd, type} is a way to 解耦变量，直接获得data里的数据， like data.user
export function register({user, pwd, repeatpwd, type}){
  // if any of them is null
  if(!user||!pwd||!type){
    return errorMsg('must provide username and password')
  }
  if(pwd !== repeatpwd){
    return errorMsg('password and repeat password must be same')
  }
  //send request
  return dispatch=>{
    axios.post('/user/register', {user, pwd, type})
      .then(res=>{
        if(res.status===200&&res.data.code===0){
          dispatch(authSuccess({user,pwd,type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}