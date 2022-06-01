import React,{useState} from 'react'
import {Link}from 'react-router-dom'
import {login} from '../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import './login.css'


function Login() {
   const initialState = {email: '', password: ''}
   const [userData, setUserData] =useState(initialState)
   const {email, password} =userData
   const dispatch = useDispatch()
   const handleChangeInput =(e)=>{
     const {name,value} = e.target
     setUserData({...userData, [name]:value})
   }

   const handleSubmit= (e)=>{
     e.preventDefault()
     console.log(userData)
     dispatch(login(userData))
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
            placeholder="Email"
           value={email}
           name="email"
           onChange={handleChangeInput}
            className="loginInput"
            type="email"
            
          />
          <input
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
            className="loginInput"
            type="password"
           
          />
          
          <button className="loginButton" type="submit" disabled={email && password ? false : true}>
            Log In
          </button>
          <Link to="/reset"  >reset-password</Link>,
          <p>
         you dont't have an account? <Link style={{color: 'crimson'}}  to="/register" >register</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login