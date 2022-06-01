import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Loading from './Loading'
import Toast from './Toast'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
function Alert() {
    const {alert}=useSelector(state =>state)
    const dispatch = useDispatch();
  return (
    <div>
       
      { alert.loading  &&  <Loading/>}

{ alert.error && <Toast msg={{title: 'Error',body: alert.error}}
handleShow={()=> dispatch({type:GLOBALTYPES.ALERT, payload:{}})}
 style={{background:"red"}}/>}
{ alert.success && <Toast msg={{title: 'Success',body: alert.success}} 
handleShow={()=> dispatch({type:GLOBALTYPES.ALERT, payload:{}})}

style={{background:"red"}}/>}
    </div>
  )
}

export default Alert