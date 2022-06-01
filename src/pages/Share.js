import "./share.css";

import {
  PermMedia,
  
} from "@material-ui/icons";
import {Avatar} from '@material-ui/core'
import React, {useState,useEffect } from "react";
import { createPost ,updatePost} from "../redux/actions/postAction";

import {useSelector,useDispatch} from 'react-redux';
import {GLOBALTYPES} from '../../src/redux/actions/globalTypes'


export default function Share() {
    const {auth,status} =useSelector(state => state)
    const dispatch = useDispatch()
    
 const [category,setCategory]= useState("")
 const [model,setModel]= useState("")
 const [serialno,setSerialno]= useState("")
 const [price,setPrice]= useState("")
    const [content,setContent]= useState("")
    
    const [images,setImages]= useState([])
      
  const handleChangeImages =(e)=>{
      const files = [...e.target.files]
      let err = ""
      let newImage = []

      files.forEach(file => {
          if(!file) return err = "File does not exist: "
          if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg'){
              return err = "image formate is incorrect"
          }
          return newImage.push(file)
      })
      if (err) dispatch({type:GLOBALTYPES.ALERT, payload:{error:err}})
      setImages([...images,...newImage])
  }

  const deleteImages = (index)=>{
      const newArr = [...images]
      newArr.splice(index,1)
      setImages(newArr)
  }

  const handleSubmit=(e)=>{
        e.preventDefault()
        if(images.length ===0)
        return dispatch({ 
            type: GLOBALTYPES.ALERT, payload:{error:"Please add your photos."}
        })
        if(status.onEdit){
          dispatch(updatePost({category,model,serialno,price,content,images,auth,status}))
        }else{
          dispatch(createPost({category,model,serialno,price,content,images,auth}))
        }
       
        setCategory("")
        setModel("")
        setPrice("")
        setSerialno("")
        setContent('')
        setImages([])
  }
  useEffect(()=>{
       if(status.onEdit){
        setCategory(status.category)
        setModel(status.model)
        setPrice(status.price)
        setSerialno(status.serialno)
         setContent(status.content)
         setImages(status.images)
       }
  },[status])

  return (
    <div className="share">
      <div className="shareWrapper">
      <form onSubmit={handleSubmit}>
        <div className="shareTop">
        <Avatar src={auth.user.avatar} alt="Remy Sharp"  />
        
          <div className="container">
          <button
          onClick={()=>dispatch({type: GLOBALTYPES.STATUS, payload:true})}
          >{auth.user.username}, share your item hear</button>
          <hr/>

          
         <div className="inputcontainer">
            
          <input
          className="input"
           placeholder="category"
           value={category}
           onChange={(e)=>setCategory(e.target.value)}
         
           
           
          />
          <input
          className="input"
            placeholder="model"
            value={model}
            onChange={(e)=>setModel(e.target.value)}
         
            
          />
          <input
          className="input"
            placeholder="Serial No"
            value={serialno}
            onChange={(e)=>setSerialno(e.target.value)}
            
            
          />
          </div>
          <div className="inputcontainer">
          {/* <input
          className="input"
            placeholder="Date"
           
            type="date"
           
          />  */}
          <input
          className="input"
            placeholder=" description"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            
           
          />
            <input
           className="input"
           placeholder="Price"
           value={price}
           onChange={(e)=>setPrice(e.target.value)}
           
            
          />
          </div>
          </div>
        </div>
        <hr className="shareHr" />
      
      <div className="show_image">
          {
              images.map((img,index)=>(
                <div key={index} id="file_img">
                    <img src={img.url ? img.url:URL.createObjectURL(img)}
                    alt="images"
                    />
                    <span onClick={()=>deleteImages(index)}>X</span>

                </div>
              ))
          }
      </div>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo </span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                
                multiple accept="image/*"
                onChange={handleChangeImages}
              />
            </label>
            
           
          </div>
          <button  className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}