import React from 'react'
import './alert.css'
function Loading() {
  return (
    <div className="loading"
    style={{backgroundColor:"#0008", color: "white",top: "0", left: "0", zIndex:50}}>
        <svg width="205" height="250" viewBox="0 0 40 50">
      <polygon stroke="#fff" strokeWidth="1" fill="none" points="20,1 40,40 1, 40" />
      <text fill="#fff" x="3" y="47">loading</text>

     
        </svg>
    </div>
  )
}

export default Loading