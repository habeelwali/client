import React,{ useState, useEffect} from 'react'
import Info from './Info'
import Post from './Post'
import {useSelector, useDispatch} from 'react-redux'
import {getProfileUsers} from '../../redux/actions/profileAction'
import {useParams} from 'react-router-dom'

function Profile() {
  const {profile,auth} = useSelector(state =>state)
  const dispatch = useDispatch()
  const {id}=useParams()


useEffect(() => { 

  if(profile.ids.every(item =>item !== id)){
    dispatch(getProfileUsers({users:profile.users, id,auth}))
  }
 
},[dispatch,id,profile.users,auth,profile.ids])

  return (
    <div style={{marginTop: '25px'}}> 
      
    
       <Info auth={auth} profile={profile} dispatch={dispatch} id={id}/>
      
      { profile.loading 
      ? <img style={{display: 'block', margin: 'auto'}} src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="loading"/>
       :<Post  auth={auth} profile={profile} dispatch={dispatch} id={id} />
      }
       
    </div>
  )
}

export default Profile