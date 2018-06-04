import React from 'react'
import axios from 'axios'

class AuthRoute extends React.Component{
  componentDidMount(){
    //get user information
    axios.get('/user/info').
      then(res=>{
        if (res.status===200){
          console.log(res.data)
        }
      })
    //is logined, user type etc
    //current url, have use complete their information

  }
  render(){
    return <p>test</p>
  }
}
export default AuthRoute