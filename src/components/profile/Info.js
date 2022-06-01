import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import EditProfile from './EditProfile'
import { useSelector, useDispatch } from 'react-redux'

import Followings from './Followings'
import Followers from './Followers'
import './info.css'
import FollowBtn from '../profile/FollowBtn'
function Info({ auth,profile,dispatch,id}) {
    // const { id } = useParams()
    // const { auth, profile } = useSelector(state => state)
    // const dispatch = useDispatch()
    const [userData, setUserData] = useState([])
    const [onEdit,setOnEdit] = useState(false)
    const [showFollowers,setShowFollowers] = useState(false)
    const [showFollowings,setShowFollowings] = useState(false)
    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user])
        }else{
            
            const newData = profile.users.filter(user => user._id ===id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users]);
    return (
        <div className="info"  >
            {userData.map((user,index) => (
                <div className="Info_container" key={index}>
                    <img src={user.avatar} alt="avatar" className="Avatar"/>
                    <div className="Info_content">
                        <div className="Info_content_title">
                            <h2>{user.username}</h2>
                            {user._id === auth.user._id
                            ?<button className="edit_btn"
                            onClick={()=>setOnEdit(true)}
                            >
                                Edit Profile
                            </button>
                        :<FollowBtn user={user}/>    
                        }
                            
                        </div>
                        <div className="follow_btn">
                            <span className="followr_span" onClick={()=>setShowFollowers(true)}>
                                {user.followers.length} Followers
                            </span>
                            <span className="following_span" onClick={()=>setShowFollowings(true)}>
                                {user.following.length} Following
                            </span>
                        </div>
                        <h6>{user.fullname} {user.mobile}</h6>
                        <p>{user.address}</p>
                        <h6>{user.email}</h6>
                        <a href={user.website}  target="_blank"   rel="noreferrer">{user.website}</a>
                        <p>{user.story}</p>
                    
                    
                    
                    {
                        onEdit && 
                        <EditProfile
                        user ={user}
                        setOnEdit={setOnEdit}
                        />
                       
                    }

                    {showFollowers && 
                    <Followers users={user.followers} setShowFollowers={setShowFollowers} />
                    }

                    
                    {showFollowings && 
                    <Followings users={user.following} setShowFollowings={setShowFollowings} />
                    }
                    
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Info