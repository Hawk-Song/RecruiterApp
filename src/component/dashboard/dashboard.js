import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'

// function Boss(){
//   return <h2>Boss</h2>
// }
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
        <NavBar className='fixd-header' mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data ={navList}></NavLinkBar>
      </div>

    )
  }
}

export default Dashboard