import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    //if in login or register page, do not need to route
    if (publicList.indexOf(pathname)>-1){
      return null
    }
    //get user information
    axios.get('/user/info').
      then(res=>{
        if (res.status===200){
          if(res.data.code===0){
            //if user loged in

          }else{
            //AuthRouter is not Router component,
            //so if want use history, decorate it with withRouter
            //if not at login or register, and user have not login in, route to login page
            this.props.history.push('/login')
          }
          console.log(res.data)
        }
      })
    //is logined,
    //current url, have use complete their information

  }
  render(){
    return <p>test</p>
  }
}
export default AuthRoute