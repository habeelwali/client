import React from 'react'
import {useParams} from 'react-router-dom'
function FullData() {
    const {id}=useParams();
    console.log(id)
  return (
    <div>FullData</div>
  )
}

export default FullData