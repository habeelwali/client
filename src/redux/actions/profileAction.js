import {GLOBALTYPES,DeleteData,EditData} from './globalTypes'
import {getDataApi,patchDataApi} from '../../utils/fetchData'
import { imageUpload} from '../../utils/imageUpload'

export const PROFILE_TYPES ={
    LOADING:'LOADING_PROFILE',
    GET_USER:'GET_PROFILE_USER',
    FOLLOW:'FOLLOW',
    UNFOLLOW:'UNFOLLOW',
    GET_ID:'GET_PROFILE_ID',
    GET_POSTS:'GET_PROFILE_POSTS'
}
export const getProfileUsers =({users,id,auth})=> async (dispatch)=>{

  
      dispatch({type:PROFILE_TYPES.GET_ID, payload:id})
        try {
            dispatch({type:PROFILE_TYPES.LOADING,payload:true});
            const res =  getDataApi(`user/${id}`,auth.token)
            const res1 =  getDataApi(`/user_posts/${id}`,auth.token)
            
            const users= await res;
            const posts= await res1;

            dispatch({
                type:PROFILE_TYPES.GET_USER,
                payload:users.data
            })
            dispatch({
                type:PROFILE_TYPES.GET_POSTS,
                payload:{...posts.data,_id: id, page:2}
            })
            dispatch({type:PROFILE_TYPES.LOADING,payload:false});
        } catch (err) {
            dispatch({
                type:GLOBALTYPES.ALERT,
                payload:{error:err.response.data.msg}
            });
        }
    
}
export const updateProfileUser = ({userData, avatar,auth}) =>async (dispatch) =>{
    if(!userData.fullname)
    return dispatch({ type: GLOBALTYPES.ALERT, payload:{error:"please add your full name"}})
    if(userData.fullname>25)
    return dispatch({ type: GLOBALTYPES.ALERT, payload:{error:"your full name is too long"}})
    if(userData.story > 200)
    return dispatch({ type: GLOBALTYPES.ALERT, payload:{error:"your story is too long"}})
    try {
        let media;
        dispatch({ type: GLOBALTYPES.ALERT, payload:{loading: true}})
        if(avatar) media = await imageUpload([avatar])
        const res = await patchDataApi('user',{
            ...userData,
            avatar: avatar?media[0].url:auth.user.avatar
        },auth.token)

        dispatch({
            type:GLOBALTYPES.ALERT,
            payload:{
                ...auth,
                user:{
                    ...auth.user,
                    ...userData,
                    avatar: avatar?media[0].url:auth.user.avatar,

                }
            }
        })
        dispatch({ type: GLOBALTYPES.ALERT, payload:{success:res.data.msg}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{error:err.response.data.msg}
        })
    }
}
export const follow = ({users,user,auth}) => async (dispatch) => {
    let newUser;
    if(users.every(item=> item._id !== user._id)){
        newUser= {...user,followers:[...user.followers, auth.user]}
    }else{
        users.forEach(item=>{
            if(item._id === user._id){
                newUser = {...item,followers:[...item.followers, auth.user]}
            }
        })
    }

    dispatch({
        type:PROFILE_TYPES.FOLLOW,
        payload:newUser
    })

    dispatch({
        type:GLOBALTYPES.Auth,
        payload: {
       ...auth,
       user: {...auth.user, following: [...auth.user.following, newUser]}
    }
    })

    try {
       await  patchDataApi(`user/${user._id}/follow`,null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{error:err.response.data.msg}
        })
    }
}


export const unfollow = ({users,user,auth}) => async (dispatch) => {
   

    let newUser;
    if(users.every(item=> item._id !== user._id)){
        newUser= {...user, followers:DeleteData(user.followers,auth.user._id)}
    }else{
        users.forEach(item=>{
            if(item._id === user._id){
                newUser = {...item, followers:DeleteData(item.followers,auth.user._id)}
            }
        })
    }
    dispatch({
        type:PROFILE_TYPES.UNFOLLOW,
        payload:newUser
    })

    dispatch({
        type:GLOBALTYPES.Auth,
        payload: {
       ...auth,
       user: {...auth.user, following:DeleteData(auth.user.following, newUser._id)}
    }
    })

    try {
        await  patchDataApi(`user/${user._id}/unfollow`,null, auth.token)
     } catch (err) {
         dispatch({
             type: GLOBALTYPES.ALERT,
             payload:{error:err.response.data.msg}
         })
     }
}