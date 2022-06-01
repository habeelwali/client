import React from 'react'
import './toast.css'
function Toast({msg,handleShow}) {
  return (
    <div className="main_div" style={{top: '100px', right: '5px',minWidth:"200px",zIndex:50 }} >
    
        <div classname="toast-header" >
           <strong className='mr-auto'>{msg.title}</strong>
           <button className="ml-2 mb-1 close" 
           onClick={handleShow}
           >X</button>
        </div>
        <div classname="toast-body">
             {msg.body}
        </div>
    </div>
  )
}

export default Toast