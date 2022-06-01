import React from 'react'
import UserCard from '../UserCard'
import FollowBtn from './FollowBtn'
import {useSelector} from 'react-redux'
import './editprofile.css'
function Followers({ users, setShowFollowers }) {
    const {auth} = useSelector(state => state)
    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Followers</h5>
                <hr/>
               <div>
                { 
                users.map(user=>(
                    <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers}>
                        {
                            auth.user._id !== user._id && <FollowBtn user={user}/>
                        }
                    </UserCard>
                ))
                }
</div>
                <div className="close" onClick={()=>setShowFollowers(false)}>X</div>

            </div>
                   
        </div>
    )
}

export default Followers