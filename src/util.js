

export function getRedirectPath({type, avatar}){
  //return route page based on user infromation
  //user.type /boss /genius
  //user.avatar /bossinfo /geniusinfo
  let url = (type==='boss'?'/boss':'/genius')
  //if avatar is not set, send user to set its info
  if(!avatar){
    url += 'info'
  }
  return url
}