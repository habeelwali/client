import React from 'react'
import Share from './Share'
import {Container} from '@material-ui/core'
import {useSelector} from 'react-redux'
import Post from './Post'
function Feed() {
  const {homePost}= useSelector(state => state)
  return (
    <Container>
        <Share/>
        {
         homePost.posts.map(post =>(
            <Post key={post._id}  post={post}   />
          ))
        }
    </Container>
  )
}

export default Feed