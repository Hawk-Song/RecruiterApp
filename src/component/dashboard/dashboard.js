import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'

function Boss(){
  return <h2>Boss</h2>
}
function Genius(){
  return <h2>Genius</h2>
}
function Msg(){
  return <h2>Message</h2>
}
function User(){
  return <h2>user center</h2>
}

@connect(
  state=>state
)
class Dashboard extends React.Component{
  

  render(){
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path:'/boss',
        text:'genius',
        icon:'boss',
        title:'Genius List',
        component:Boss,
        hide:user.type==='genius'
      },
      {
        path:'/genius',
        text:'boss',
        icon:'job',
        title:'Boss List',
        component:Genius,
        hide:user.type==='boss'
      },
      {
        path:'/msg',
        text:'message',
        icon:'msg',
        title:'Message List',
        component:Msg,
      },
      {
        path:'/me',
        text:'me',
        icon:'user',
        title:'User Center',
        component:User,
      }
    ]
    return (
      <div>
        <NavBar mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
        <h2>content</h2>
        <NavLinkBar data ={navList}></NavLinkBar>
      </div>

    )
  }
}

export default Dashboard