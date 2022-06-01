import React from 'react'
import {FavoriteBorderOutlined,Favorite} from '@material-ui/icons';
import './card.css'
function Likebtn({islike,handlLike,handlUnLike}) {
  return (
    <>
    
        {islike ?(
            <Favorite  onClick={handlUnLike}/>
          ) : (
            <FavoriteBorderOutlined onClick={handlLike}/>
          )}
    
    </>
  )
}

export default Likebtn