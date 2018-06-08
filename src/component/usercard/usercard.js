import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  handleClick(v){
    this.props.history.push(`/chat/${v._id}`)
  }
  render(){
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
      <WhiteSpace></WhiteSpace>
        {this.props.userList.map(v=>(
          v.avatar?<Card 
                      key={v._id}
                      onClick={()=>this.handleClick(v)}
                  >
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            >
            </Header>
            <Body>
            {v.type==='boss'?<div>Company: {v.company}</div>:null}
              {v.desc.split('\n').map(d=>(
                <div key={d}>{d}</div>
              ))}
              {v.type==='boss'?<div>Salary: {v.money}</div>:null}
            </Body>
          </Card>:null
        ))}
      </WingBlank>
    )
  }
}
export default UserCard