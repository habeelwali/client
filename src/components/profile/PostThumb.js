import React from 'react'
import { Link } from 'react-router-dom'
import './editprofile.css'
import { IconButton } from '@material-ui/core'
import { ModeCommentOutlined } from '@material-ui/icons'
function PostThumb({ posts,result }) {
    
    if(result===0)return <h2 style={{textAlign: 'center',color: 'red'}}>No Post</h2>
    return (
        <div className="post-thumb">
            {
                posts.map(post => (
                    
                    <Link key={post._id} to={`/post/${post._id}`}>
                         
                        <div className="post-thumb_display">
                            <img src={post.images[0].url} alt={post.images[0].url} />
                            <div className="post-thumb_menu">
                                {post.likes.length > 0 ? (
                                    <img className="found" src="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-raising-hand-light-skin-tone.png" alt="" />
                                ) : (
                                    <img className="found" src="https://p.kindpng.com/picc/s/608-6080151_facepalm-girl-png-photos-emoji-girl-hand-on.png" alt="" />
                                )}
                                <IconButton  aria-label="comment">
                                    <ModeCommentOutlined className="comment_icon"/>
                                </IconButton>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default PostThumb