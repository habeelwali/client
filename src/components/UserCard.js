import React from 'react'
import './card.css'
import { Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom'
function UserCard({children,user,handleClose,setShowFollowers,setShowFollowings}) {
  const handleCloseAll = ()=>{
    if (handleClose) handleClose()
    if (setShowFollowers) setShowFollowers(false)
    if(setShowFollowings) setShowFollowings(false)
  }
  return (
    <div className='user-card'>
      <div>
      <Link style={{textDecoration:'none'}} onClick={handleCloseAll}  to={`/profile/${user._id}`}>
      <Avatar  src={user.avatar} alt="profile"/>
        <div className='user-data' style={{transform: 'translateY(-2px'}}>
        <span>{user.username}</span>
        <small >{user.fullname}</small>
        </div>
        </Link>
      </div>
       {children}
    </div>
  )
}

export default UserCard