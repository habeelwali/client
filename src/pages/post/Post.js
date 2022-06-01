import React from 'react'
import {useParams} from 'react-router-dom'
function Post() {
  let {id} = useParams();
  console.log(id)
  return (
    <div style={{marginTop:"50%"}}>post</div>
  )
}

export default Post