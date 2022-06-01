/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { makeStyles, styled, Typography, Card, CardHeader, Avatar, IconButton, CardContent, CardActions, Collapse } from '@material-ui/core'
import { MoreVert, ExpandMore, Share, Delete, FileCopyOutlined, ModeCommentOutlined, Edit } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import FoundButton from '../components/FoundButton'
import Likebtn from '../components/Likebtn'
import { foundPost, unfoundPost } from '../redux/actions/postAction'
import Comment from '../components/Comment'
import InputComment from '../components/InputComment'
import {deletePost} from '../redux/actions/postAction'
import {useNavigate} from 'react-router-dom';
import {BASE_URL} from '../utils/config'
import ShareModel from '../components/ShareModel'
const khan = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(4),
  },
  avator: {
    backgroundColor: theme.palette.primary,
  },
  img: {
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
      objectFit: 'cover',

    },

  },

  readmore: {
    color: "crimson",
    cursor: "pointer",
  },
  cardfotter: {
    display: "flex",
    justifyContent: "space-around",

  },
  likes: {
    marginRight: "10px",
  },
  dropdown_menu: {
    backgroundColor: "white",
    position: "absolute",
    left: "52%",

    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    padding: "10px",



  }

}))
const ExpandMores = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
function Post({ post }) {
  const navigate = useNavigate();
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()
  const [found, setFound] = useState(false);
  const [loadfound, setLoadFound] = useState(false);

  const [share,setShare]=useState(false)
  const [readMore, setReadMore] = useState(false)


  const [expanded, setExpanded] = React.useState(false);




  const handleExpandClick = () => {
    setExpanded(!expanded);

  };
  const handleEditPost = () => {

    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } })
  }

  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user._id)) {
      setFound(true)
    }
  }, [post.likes, auth.user._id])

  const handlFound = async () => {
    if (loadfound) return;
    setFound(true);
    setLoadFound(true)
    await dispatch(foundPost({ post, auth }))
    setLoadFound(false)
  }
  const handlUnFound = async () => {

    if (loadfound) return;
    setFound(false);
    setLoadFound(true)
    await dispatch(unfoundPost({ post, auth }))
    setLoadFound(false)
  }

  const handleDeletePost=()=>{
    if(window.confirm("Do you want to delete this post")){
      dispatch(deletePost({ post,auth}))
      return navigate('/')
    }
    
  }
  const handleCopylink=()=>{
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    setExpanded(false)
  }

  const classes = khan();
  return (
    <Card sx={{ minWidth: 275 }} className={classes.card} >
      <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" src={post.user.avatar} />
        }

        action={
          <div>
            <IconButton aria-label="settings" data-toggle="dropdown">
              <span id="moreVert" data-toggle="dropdown">
                <MoreVert
                  expand={expanded}
                  onClick={handleExpandClick}
                //  aria-expanded={expanded}
                //  aria-label="show more"
                />
              </span>
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <div className={classes.dropdown_menu}>
                {auth.user._id === post.user._id &&
                  <>
                    <div className={classes.dropdown_item} onClick={handleEditPost}>

                      <span><Edit /></span> Edit post

                    </div>
                    <div className={classes.dropdown_item} onClick={handleDeletePost}>

                      <span><Delete /></span>remove post

                    </div>


                  </>

                }
                <div className={classes.dropdown_item} onClick={handleCopylink}>

                  <span> <FileCopyOutlined /></span>Copy Link

                </div>
              </div>
            </Collapse>


          </div>
        }
        title={post.user.username}
        subheader={moment(post.createdAt).fromNow()}


      />
      {
        post.images.map(img => (
          <img className={classes.img} src={img.url} />
        ))
      }



      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {
            post.content.length < 60
              ? post.content
              : readMore ? post.content + ' ' : post.content.slice(0, 60) + '....'

          }

          {
            post.content.length > 60 &&
            <span className={classes.readmore} onClick={() => setReadMore(!readMore)}>
              {readMore ? 'Hide content' : 'Read more'}
            </span>


          }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">

          <FoundButton
            found={found}
            handlFound={handlFound}
            handlUnFound={handlUnFound}
          />
         

          {/* {found ?(
            <img className={classes.found} src="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-raising-hand-light-skin-tone.png"/>
          ) : (
            <img className={classes.found} src="https://p.kindpng.com/picc/s/608-6080151_facepalm-girl-png-photos-emoji-girl-hand-on.png" onClick={setFound(false)} />
          )}
           */}
        </IconButton>



        <Link to={`/post/${post._id}`}>
          <IconButton aria-label="comment">
            <ModeCommentOutlined />
          </IconButton>
        </Link>

        <div className={classes.cardfotter}>
          {/* <Typography className={classes.likes} variant="body6" color="text.secondary">
            {post.likes.length}likes
          </Typography> */}
          <Typography variant="body6" color="text.secondary">
            {post.comments.length}comments
          </Typography>
        </div>

        <IconButton aria-label="share" onClick={()=>setShare(!share)}>
          <Share />
        </IconButton>

        

        
        <ExpandMores
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >

          <ExpandMore />
        </ExpandMores>
       
      </CardActions>
      {
          share && 
          <ShareModel url={`${BASE_URL}/post/${post._id}`}/>

        }
     
      <Collapse in={expanded} timeout="auto" unmountOnExit>

        <CardContent>
          <Typography >Item Detail</Typography>
          <hr />

          <Typography>
            Name :
            {post.category}
          </Typography>
          <hr />
          <Typography >
            <label>Model : </label>
            <span>{post.model}</span>
          </Typography>
          <hr />
          <Typography >
            <label>serial No : </label>
            <span>{post.serialno}</span>
          </Typography>
          <hr />


          <hr />
          <Typography>
            <label>Price : </label>
            <span> {post.price}</span>
          </Typography>
        </CardContent>
      </Collapse>

      <Comment post={post}/>
      <InputComment post={post}/>

    </Card>
  )
}

export default Post
