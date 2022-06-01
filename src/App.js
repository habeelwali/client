import {useEffect} from 'react'
import './App.css';
import NotFound from './components/NotFound'
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login.js';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Alert from './components/alert/Alert'
import {useSelector, useDispatch} from 'react-redux'
import {refreshToken} from './redux/actions/authAction'
import Header from './components/header/Header'
import Profile from './components/profile/Profile'
import Post from './pages/post/Post'
import FullData from './components/FullData'
import {getPosts} from './redux/actions/postAction'
import {getSuggestions} from './redux/actions/suggestionAction'
function App() {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(()=>{
dispatch(refreshToken())
  },[dispatch])

  useEffect(()=>{
    if(auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
    }
    
      },[dispatch,auth.token])


  return (
    <div >
      <Router>
        {auth.token && <Header/> } 
        
        <Alert/>
        <Routes>
          
           
            <Route exect path="/" element={auth.token ? <Home /> :<Login/>} />
            <Route exect path="/:profile/:id" element={auth.token ?<Profile/>:<Login/>}/>
            <Route exect path="/:post/:id" element={auth.token ?<FullData/>:<Login/>}/>
        
        
        <Route path="/register" element={<Register />} />
        
          
      
        </Routes>
      </Router>
    </div>
  );
}

export default App;
