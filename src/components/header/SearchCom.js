import React,{useState,useEffect} from 'react'
import { makeStyles, InputBase} from '@material-ui/core'
import {  Search } from '@material-ui/icons'
import {useSelector,useDispatch} from 'react-redux'
import {getDataApi} from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import {Link} from 'react-router-dom'
import UserCard from '../../components/UserCard'
const sytlesheet = makeStyles((theme)=>({
  toolbar:{
      display:"flex",
      justifyContent:"",
      
      background: 'linear-gradient(30deg,   #1F456E  52.5%,  #0492C2 30% )',
      
    
  },
  links:{
      display:(props)=>(props.open ? "none" : "flex"),
  },
  button:{
      display:"flex",
      alignItems:"center",
      justifyContent:"space between",
      marginLeft:"50%"
     
      
      
  },
  link:{
      marginRight:"10px",
      fontSize:"1.2rem",
      fontWeight:"bolder",
      cursor:"pointer",
      textDecoration:"None",
      border:'none',
      color:"white",
      [theme.breakpoints.down("sm")]:{
          display:"none"
      }
      
  },
  arrowBack:{
      [theme.breakpoints.down("sm")]:{
          display:(props)=>(props.open ? "flex" : "none"),
      },
      [theme.breakpoints.up("sm")]:{
          display:("none"),
      }
  },
  search:{
      display:"flex",
      alignItems:"center",
      backgroundColor:"white",
      borderRadius:"10px",
      marginLeft:"20px",
      [theme.breakpoints.down("sm")]:{
          display:(props)=>(props.open ? "flex" : "none"),
      },
      
      
  },
  searchicon:{
      color:"black",
      marginLeft:"10px"
  },
  users:{
      position:"absolute",
      width:"10%",
      minWidth:"250px",
      backgroundColor:"#fafafa",
      maxHeight:"cal(100vh - 150vh)",
      overflow:"auto",
      marginTop:"3px",
      borderRadius:"10px"
  },

  searchinput:{
      marginLeft:"5px"
  },
  rightdiv:{
      display:"flex",
      alignItems:"center",
    
      
      
  },
  notificon:{
  marginRight:"25px",
  display:(props)=>(props.open ? "none" : "flex"),
  },
  searchbutton:{
      marginRight:theme.spacing(2),
      [theme.breakpoints.up("sm")]:{
          display:("none"),
      }
  },
  user:{
      marginTop:theme.spacing(1),
      display:"flex",
      alignItems:"center",
      flexDirection:"column",
      textDecoration:"none",
      color:"white"
  },
 
  
  }))

function SearchComp() {
    const [open,setOpen]= useState(true);
    const [search, setSearch] = useState('')
    const [users,setUsers] = useState([])
      const [load,setLoad]= useState(false)
    const {auth}= useSelector(state =>state)
    const dispatch = useDispatch()



const handleSearch = async(e)=>{
    e.preventDefault()
    if(!search) return;
    try {
        setLoad(true)
        const res = await  getDataApi(`search?username=${search}`, auth.token)
        setUsers(res.data.users)
        setLoad(false)
    } catch (err) {
        dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}})
    }

}

const handleClose=()=>{
    setSearch('')
    setUsers([]);
}
    const classes = sytlesheet({open});
  return (
    <div>
         <form onSubmit={handleSearch}>
        <div  className={classes.search}>
           
                   <Search className={classes.searchicon}/>
                   <input
                    style={{border:"none"}}
                   type="text"
                   name="search"
                   value={search}
                   placeholder="search..." className={classes.searchinput}
                   onChange={e=>setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
                   /> 
                  <div onClick={handleClose} 
                  style={{color:"black",cursor:"pointer",opacity:users.length === 0?0:1}}>X
                  </div>
               </div>

               <button style={{display:"none"}} type="submit">Serach</button>
               

              <div className={classes.users}>
                  {
                  search && users.map(user=>(
                   
                        <UserCard key={user._id} handleClose={handleClose} user={user} border="border"/>
                    
                    ))}

              </div>

               </form>

              
    </div>
  )
}

export default SearchComp