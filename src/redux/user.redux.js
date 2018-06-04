import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState={
  isAuth:'',
  msg:'',
  user:'',
  pwd:'',
  type:''
}

//reducer
//must have initState, otherwise error
export function user(state=initState, action){
  switch(action.type){
    case REGISTER_SUCCESS:
      return {...state, msg:'', isAuth:true, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }  
}

function registerSuccess(data){
  return {type:REGISTER_SUCCESS, payload:data}
}
function errorMsg(msg){
  //actually {msg:msg, type:ERROR_MSG},
  //but msg is variable, so we can write it shortly
  return {msg, type:ERROR_MSG}
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
          dispatch(registerSuccess({user,pwd,type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}