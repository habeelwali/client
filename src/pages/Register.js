import React, {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate,Link} from 'react-router-dom'

import {register} from '../redux/actions/authAction'
function Register() {

  const {auth,alert} = useSelector(state =>state)
  const dispatch = useDispatch()
  const history =  useNavigate()

  const initialState = {
    fullname:'',username:'' ,email: '', password: '', cf_password:'', gender:'male'
  }
   const [userData, setUserData] =useState(initialState)
   const {fullname,username ,email, password, cf_password} = userData


  useEffect(()=>{
if(auth.token) history("/")
  },[auth.token,history])


   
   
   const handleChangeInput =(e)=>{
     const {name,value} = e.target
     setUserData({...userData, [name]:value})
   }

   const handleSubmit= (e)=>{
     e.preventDefault()
    dispatch(register(userData))
    
   }

  return (
    <div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo">MobiCAr</h3>
        <span className="loginDesc">
         Mobicar is a social app to register our item
        </span>
      </div>
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleSubmit} >
        <input
            placeholder="Full Name"
           value={fullname}
           name="fullname"
           onChange={handleChangeInput}
            className="loginInput"
            type="text"
            style={{backgroundColor: `${alert.fullname ? '#fd2d6a14':''}`}}
            
          />
           <span style={{color: '#FF0000'}}>{alert.fullname ? alert.fullname : ''}
            </span>
          <input
            placeholder="User Name"
           value={username.toLowerCase().replace(/ /g, "")}
           name="username"
           onChange={handleChangeInput}
            className="loginInput"
            type="text"
            style={{backgroundColor: `${alert.username ? '#fd2d6a14':''}`}}
            
          />
          <span style={{color: '#FF0000'}}>{alert.username ? alert.username : ''}
            </span>
          <input
            placeholder="Email"
           value={email}
           name="email"
           onChange={handleChangeInput}
            className="loginInput"
            type="email"
            style={{backgroundColor: `${alert.email ? '#fd2d6a14':''}`}}
          />
          <span style={{color: '#FF0000'}}>{alert.email ? alert.email : ''}
            </span>
          <input
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
            className="loginInput"
            type="password"
            style={{backgroundColor: `${alert.password ? '#fd2d6a14':''}`}}
          />
           <span style={{color: '#FF0000'}}>{alert.password ? alert.password : ''}
            </span>
           <input
            placeholder="Confirm Password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            className="loginInput"
            type="password"
            
            style={{backgroundColor: `${alert.cf_password ? '#fd2d6a14':''}`}} 
          />
          <span style={{color: '#FF0000'}}>{alert.cf_password ? alert.cf_password : ''}
            </span>
         <div>
          <label>
            male:<input type='radio'  id="male" name="gender" value="male" onChange={handleChangeInput} defaultChecked/>
          </label>
          <label>
            female:<input type='radio'  id="female" name="gender" value="female" onChange={handleChangeInput}/>
          </label>
          <label>
            other:<input type='radio'  id="other" name="gender" value="other" onChange={handleChangeInput}/>
          </label>
          </div>
          
          <button className="loginButton" type="submit" >
            Register
          </button>
          <Link to="/reset"  >reset-password</Link>,
          <p>
         you already have an account? <Link style={{color: 'crimson'}}  to="/login" >login now</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Register