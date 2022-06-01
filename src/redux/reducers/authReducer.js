 import {GLOBALTYPES} from '../actions/globalTypes.js'

 const initialState = {}

 const authReducer = (state = initialState, action)=>{
     switch (action.type){
         case GLOBALTYPES.Auth:
             return action.payload;
        default:
            return state;
     }
 }

 export default authReducer