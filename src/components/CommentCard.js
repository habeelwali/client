import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import './card.css'
import moment from 'moment'
import Likebtn from './Likebtn'
import CommentMenu from './CommentMenu'
import InputComment from './InputComment'
import { useSelector, useDispatch } from 'react-redux'
import {updateComment,likeComment,UnlikeComment} from '../redux/actions/commentAction'
function CommentCard({children, comment, post, commentId }) {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [readmore, setReadMore] = useState(false)
    const [islike, setIsLike] = useState(false)
    const [onEdit, setOnEdit] = useState(false)
    const [loadLike, setLoadLike] = useState(false)
    const [onReply,setOnReply]=useState(false)
    useEffect(() => {
        setContent(comment.content)
        setIsLike(false)
        setOnReply(false)
        if(comment.likes.find(like=>like._id===auth.user._id)){
            setIsLike(true)
        }
    }, [comment,auth.user._id])

    const handlLike = async() => {
        if(loadLike) return;
        setIsLike(true)

        setLoadLike(true)
        await dispatch(likeComment({comment,post,auth}))
        setLoadLike(false)
     }
    const handlUnLike = async() => { 
        if(loadLike) return;
        setIsLike(false)
        setLoadLike(true)
        await dispatch(UnlikeComment({comment,post,auth}))
        setLoadLike(false)
    }
    const handleUpdate=()=>{
       if(comment.content!==content){
          dispatch(updateComment({comment,post,content,auth}))
          setOnEdit(false)
       }else{
           setOnEdit(false)
       }
    }

    const handleReply = ()=>{
        if(onReply) return setOnReply(false)
        setOnReply({...comment,commentId})
        
    }

    const styleCard = {
        // opacity: comment._id ? 1 : 0.5,
        // pointerEvents: comment._id ? 'inherit' : 'none'
    }
    return (
        <div className="comment-card" style={styleCard}>
            <Link style={{ display: 'flex', }} to={`/profile/${comment.user._id}`} >
                <Avatar alt="Remy Sharp" src={post.user.avatar} />
                <h6 className="comment-user">{comment.user.username}</h6>
            </Link>
            <div className="comment-content">
                <div className="flex-fill">

                    {
                        onEdit
                            ? <textarea rows="5" value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                            : <div>
                                {
                                    comment.tag && comment.tag._id !== comment.user._id && 
                                    <Link to={`/profile/${comment.tag._id}`} style={{marginRight:"7px"}}>
                                        @{comment.tag.username}
                                    </Link>
                                }
                                <span>
                                    {
                                        content.length < 100 ? content :
                                            readmore ? content + ' ' : content.slice(0, 100) + '....'
                                    }
                                </span>
                                {
                                    content.length > 100 &&
                                    <span className="readMore" onClick={() => setReadMore(!readmore)}>
                                        {readmore ? 'Hide content' : 'Read More'}
                                    </span>
                                }
                            </div>
                    }

                    <div style={{ cursor: 'pointer' }}>
                        <small style={{ fontWeight: 'bold', marginRight: '10px' }}>
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small style={{ fontWeight: 'bold', marginRight: '10px' }}>
                            {comment.likes.length} likes
                        </small>
                        {
                            onEdit
                            ?<>
                            <small style={{ fontWeight: 'bold', marginRight: '10px' }}
                            onClick={handleUpdate}
                            >
                            update
                        </small>
                        <small style={{ fontWeight: 'bold', marginRight: '10px' }} onClick={()=>setOnEdit(false)}>
                            cancel
                        </small>
                            </>
                            : <small style={{ fontWeight: 'bold', marginRight: '10px' }}
                            onClick={handleReply}
                            >
                                {
                                    onReply ? 'cancel':'reply'
                                }
                            
                        </small>
                            }
                       
                    </div>






                </div>

                <div>
                    <Likebtn islike={islike} handlLike={handlLike} handlUnLike={handlUnLike}  />
                    <CommentMenu post={post} comment={comment}  setOnEdit={setOnEdit} />
                </div>

           
           
           
           
           
           
            </div>
            {
               onReply && 
               <InputComment post={post} onReply={onReply} setOnReply={setOnReply} >
               <Link to={`/profile/${onReply.user._id}`} style={{marginRight:'1px'}}>
                   @{onReply.user.username}:
               </Link>
               </InputComment>

           }

           {children}
        </div>
    )
}

export default CommentCard