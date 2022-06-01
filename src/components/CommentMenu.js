import React from 'react'
import './card.css'
import { MoreVert, Edit, Delete } from '@material-ui/icons'
import { Collapse } from '@material-ui/core'
import { deleteComment } from '../redux/actions/commentAction'
import { useSelector, useDispatch } from 'react-redux'
function CommentMenu({ post, comment, setOnEdit }) {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);

  };
  const handlRemove = () => {
    if(post.user._id === auth.user._id || comment.user._id === auth.user._id){
    dispatch(deleteComment({ post, auth, comment }))
    }
  }
  return (
    <div className="comment_menu">
      {
        (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
        <div className="nav_item">
          <span id="moreVert" data-toggle="dropdown">
            <MoreVert
              expand={expanded}
              onClick={handleExpandClick}
            // //  aria-expanded={expanded}
            // //  aria-label="show more"
            />
          </span>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className="menu">
              {post.user._id === auth.user._id ? comment.user._id === auth.user._id ?
                <>
                  <div className="dropdown_item" onClick={() => setOnEdit(true)}>

                    <span ><Edit /></span> Edit post

                  </div>
                  <div className="dropdown_item" onClick={handlRemove}>

                    <span><Delete /></span>remove post

                  </div>


                </> : <div className="dropdown_item" onClick={handlRemove}>

                  <span><Delete /></span>remove post

                </div> : comment.user._id === auth.user._id &&
              <>
                <div className="dropdown_item" onClick={() => setOnEdit(true)}>

                  <span ><Edit /></span> Edit post

                </div>
                <div className="dropdown_item" onClick={handlRemove}>

                  <span><Delete /></span>remove post

                </div>


              </>

              }

            </div>
          </Collapse>


        </div>
      }
    </div>
  )
}

export default CommentMenu