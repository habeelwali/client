import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import UserCard from '../components/UserCard'
import {Replay} from '@material-ui/icons';
import {getSuggestions} from '../redux/actions/suggestionAction'
function RightBar() {
  const {auth,suggestions} = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div style={{marginTop:'30%', display: 'flex', flexDirection:'column',alignItems: 'center',marginLeft:'10%'}}>
       <UserCard user={auth.user}/>
<div style={{display: 'flex',justifyContent:'space-between',alignItems: 'center'}}>
  <h5 style={{marginRight:'50px', fontSize:'1.5rem',}}>Suggestion For You</h5>
   {
     !suggestions.loading && 
     <Replay style={{cursor: 'pointer'}}
     onClick={()=>dispatch(getSuggestions(auth.token))}
     />
   }
</div>

{ suggestions.loading 
      ? <img style={{display: 'block', margin: 'auto'}} src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="loading"/>
       :<div style={{display: 'flex', flexDirection: 'row',justifyContent:'space-between',flexWrap: 'wrap'}}>
         {
           suggestions.users.map(user=>(
            <UserCard style={{margin:'20px'}} key={user._id} user={user}/>

            
           ))
         }
       </div>
      }
      
       
    </div>
  )
}

export default RightBar