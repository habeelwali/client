import { makeStyles, AppBar, Toolbar, Typography, InputBase,Avatar,Badge} from '@material-ui/core'
import {Search, Notifications,ArrowBack} from '@material-ui/icons';
import  {Link,useNavigate} from 'react-router-dom'
import { userContext } from '../../App';
import {logout} from '../../redux/actions/authAction'
import SearchComp from './SearchCom'
import React,{useState,useEffect,useContext} from 'react'

import {useSelector,useDispatch} from 'react-redux'


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
    marginRight:"40px",
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
    marginRight:theme.spacing(1),
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
notifications:{
    position:'absolute',
    top:"70px",
    backgroundColor:"white",
    fontSize:"1rem",
    display:"flex",
    flexDirection:"column",
    padding:"10px",
    color:"black",
    marginLeft:"80%",
    borderRadius:"10px"
},
nButton:{
    width:"80%",
    padding:"5px",
    marginTop:"10px"
}

}))
function Header() {
   
   
   
    const [open,setOpen]= useState(true);
   


const {auth} = useSelector(state =>state)

const dispatch = useDispatch()
  


    const classes = sytlesheet({open});
    return (
        <AppBar position="fixed">
           <Toolbar className={classes.toolbar}>
               <Typography className={classes.links} variant='h6'>
                     MobiCar
               </Typography>
              
               <ArrowBack className={classes.arrowBack}
               onClick={()=>setOpen(false)}
               />
               <div className={classes.button}>
               <Link to="/" className={classes.link} >HOME</Link>
                   <Link to="/about" className={classes.link}>ABOUT</Link>
                  <Link to="/" onClick={()=>dispatch(logout())} className={classes.link}>LOGOUT</Link>
               </div>
               <div className={classes.rightdiv} >
               
               <ul>
                      
                      
                       
                     
             <SearchComp/>
                      
                   </ul>
               <div className={classes.notificon} >
                   <Search className={classes.searchbutton}
                   onClick={()=>setOpen(true)}
                   />
               <Badge  color="secondary">
                 <Notifications   />
               </Badge>
               </div>
          <Link  to={`/profile/${auth.user._id}`} className={classes.user} >
               <Avatar />
               <Typography>{auth.user.username}</Typography>
               </Link>
               </div>
              
           </Toolbar>
           
           

        </AppBar>
    )
}

export default Header
