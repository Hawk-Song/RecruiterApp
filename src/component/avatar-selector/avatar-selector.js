import React from 'react'
import {Grid, List} from 'antd-mobile'
import propTyepes from 'prop-types'
class AvatarSelector extends React.Component {
  static propTypes = {
    //type check for selectAvatar
    selectAvatar:propTyepes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',').map(v=>({
                          icon:require(`../img/${v}.png`), //use require to introduce file
                          text:v
                        }))
    const gridHeader = this.state.icon?(<div>
                                          <span>selected picture</span>
                                          <img style={{width:20}} src={this.state.icon} alt=""/>
                                        </div>):<div>please choose picture</div>
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid 
            data={avatarList} 
            columnNum={5}
            onClick={elm=>{
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}
            />
        </List>
      </div>
    )
  }
}
export default AvatarSelector