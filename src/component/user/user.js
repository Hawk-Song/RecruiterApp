import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {logoutSubmit}
)
class User extends React.Component{

  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(){
    const alert = Modal.alert
    alert('Logout', 'Are you sure???', [
        { text: 'Cancel', onPress: () => console.log('cancel') },
        { text: 'Ok', onPress: () => {
          browserCookie.erase('userid')
          //force to reload page
          // window.location.href = window.location.href
          //remove data in redux
          this.props.logoutSubmit()
        } },
      ])

    }
  

  render(){
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user?(
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} alt='' style={{width:70}}/>}
          title={this.props.user}
          message={props.type==='boss'?props.company:null}
        />
        <List renderHeader={()=>'Brief Introduction'}>
          <Item multipleLine>
            {props.title}
            {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {props.money?<Brief>Salary: {props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>Logout</Item>
        </List>
      </div>
    ):<Redirect to={this.props.redirectTo}/>
  }
}

export default User