import React, { useState, useEffect}from 'react'
import CommentCard from './CommentCard'
import './card.css'
function CommentDisplay({comment,post,replyCm}) {
  const [showRep,setShowRep]= useState([])
   const [next,setNext] = useState(1)

  useEffect(()=>{
    setShowRep(replyCm.slice(replyCm.length - next))
  },[replyCm,next])
  return (
    <div className="comment-display">
        <CommentCard comment={comment} post={post} commentId={comment._id}>
         <div style={{paddingLeft:"20px", marginTop:"10px",marginBottom:"10px"}}>
           {
             showRep.map((item,index)=>(
               item.reply &&
               <CommentCard 
               key={index}
               comment={item}
               post={post}
               commentId={comment._id}/>
             ))
           }

           {
             replyCm.length - next>0
             ?<div style={{padding:'20px'}}
             onClick={()=>setNext(next+10)}
             >
               see more comments...
             </div>
             : replyCm.length>1 &&
             <div onClick={()=>setNext(2)}>
             hide comments...
           </div>
           }


         </div>
        </CommentCard>
    </div>
  )
}

export default CommentDisplay