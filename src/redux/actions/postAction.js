import { GLOBALTYPES} from './globalTypes'
import {imageUpload} from '../../utils/imageUpload'
import {postDataApi,getDataApi,patchDataApi,deleteDataApi} from '../../utils/fetchData'


export const POST_TYPES ={
    CREATE_POST:'CREATE_POST',
    LOADING_POST:'LOADING_POST',
    GET_POST:'GET_POST',
    UPDATE_POST:'UPDATE_POST',
    DELETE_POST:'DELETE_POST'
}
export const createPost = ({category,model,serialno,price,content,images,auth})=>async(dispatch)=>{
   let media = []

   try {
       dispatch({type:GLOBALTYPES.ALERT, payload:{loading: true}})
       if(images.length>0) media = await imageUpload(images)
       const res = await postDataApi('posts',{category,model,serialno,price,content,images:media},auth.token)
       dispatch({
           type: POST_TYPES.CREATE_POST,
           payload:{...res.data.newPost,user:auth.user}
        })
       dispatch({type:GLOBALTYPES.ALERT, payload:{loading: false}})
   } catch (err) {
       dispatch({
           type: GLOBALTYPES.ALERT,
           payload:{error:err.response.data.msg}
       })
   }
}

export const getPosts = (token) => async (dispatch)=>{
   try {
       dispatch({type:POST_TYPES.LOADING_POST, payload: true})
       const res = await getDataApi('posts',token)
       dispatch({
           type:POST_TYPES.GET_POST,
           payload:{...res.data,page:2}
       })
       dispatch({type:POST_TYPES.LOADING_POST, payload: false})
   } catch (err) {
    dispatch({
        type: GLOBALTYPES.ALERT,
        payload:{error:err.response.data.msg}
    })
   }
}

export const updatePost = ({category,model,serialno,price,content,images,auth,status})=>async(dispatch)=>{
    let media = []
   const imgNewUrl = images.filter(img=>!img.url)
   const imgOldUrl = images.filter(img=>img.url)
   
   if(status.content === content 
    && status.category===category
    && status.model === model
    && status.serialno === serialno
    && status.price === price
    &&  imgNewUrl.length === 0
    && imgOldUrl.length === status.images.length
    ) return;
    try {
         dispatch({type:GLOBALTYPES.ALERT, payload:{loading: true}})
         if(imgNewUrl.length>0) media = await imageUpload(imgNewUrl)
         const res = await patchDataApi(`post/${status._id}`,{
             category,model,serialno,price,content,images:[...imgOldUrl, ...media]
            },auth.token)
            
         dispatch({type: POST_TYPES.UPDATE_POST,payload:res.data.newPost})
         dispatch({type:GLOBALTYPES.ALERT, payload:{success: res.data.msg}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{error:err.response.data.msg}
        })
    }
 }

 export const foundPost=({post,auth})=>async (dispatch) =>{
    
     const newPost = {...post, likes:[...post.likes,auth.user]}
     console.log({newPost})
        dispatch({type:POST_TYPES.UPDATE_POST,payload:newPost})

    try {
        await patchDataApi(`post/${post._id}/like`,null,auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{error:err.response.data.msg}
        })
    }
 }
 export const unfoundPost=({post,auth})=>async (dispatch) =>{
    
    const newPost = {...post, likes:post.likes.filter(like=>like._id !== auth.user._id)}
   
       dispatch({type:POST_TYPES.UPDATE_POST,payload:newPost})

   try {
       await patchDataApi(`post/${post._id}/unlike`,null,auth.token)
   } catch (err) {
       dispatch({
           type: GLOBALTYPES.ALERT,
           payload:{error:err.response.data.msg}
       })
   }
}
export const deletePost=({post,auth})=> async (dispatch) =>{
         

         dispatch({type: POST_TYPES.DELETE_POST,payload:post})

         try {
              deleteDataApi(`post/${post._id}`,auth.token)
         } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload:{error:err.response.data.msg}
            })
         }
}