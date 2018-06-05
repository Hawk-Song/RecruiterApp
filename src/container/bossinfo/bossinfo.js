import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BossInfo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title:'',
      desc:'',
			company:'',
			money:''
    }
  }
  onChange(key, val){
    this.setState({
      [key]:val
    })
  }

  render(){
    return (
      <div>
        <NavBar mode="dark">BossPage</NavBar>
        <AvatarSelector
          selectAvatar={(imgname)=>{
            this.setState({
              avatar:imgname
            })
          }}
        ></AvatarSelector>
        <InputItem onChange={(v)=>this.onChange('title', v)}>
          Jobs
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('company', v)}>
          Company
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('money', v)}>
          Salary
        </InputItem>
        <TextareaItem onChange={(v)=>this.onChange('desc', v)}
          rows={3}
          autoHeight
          title='Requires'
        > 
        </TextareaItem>
        <Button type='primary'>save</Button>
      </div>
    )
  }
}
export default BossInfo