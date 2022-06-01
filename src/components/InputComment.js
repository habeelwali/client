import React,{useState} from 'react'
import './card.css'
import {createComment} from '../redux/actions/commentAction.js'
import {useSelector, useDispatch} from 'react-redux'
function InputComment({children, post,onReply,setOnReply}) {
    const [content,setContent] =useState('')
    const {auth}= useSelector(state => state)
    const dispatch = useDispatch()
    const handleSubmit =(e)=>{
        e.preventDefault()
        if(!content.trim()) return;
        setContent("")
        const newComment ={
            content,
            likes:[],
            user: auth.user, 
            createdAt: new Date().toISOString(),
            reply:onReply && onReply.commentId,
            tag:onReply && onReply.user
        }
       dispatch(createComment({post,newComment,auth}))
       if(setOnReply) return setOnReply(false)
    }
  return (
    <form className='cardInput' onSubmit={handleSubmit}>
        {children}
        <input type="text" placeholder="Add your comments ..." 
        value={content} onChange={e=>setContent(e.target.value)}
        />

        <button type='submit' className="postbtn">Post</button>

    </form>
  )
}

export default InputComment