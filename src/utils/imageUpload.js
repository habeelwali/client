export const checkImage = (file) =>{
    let err = ""
    if(!file) return err = "File does not exist"
    if(file.size > 1024*1024)
    err ="the larget image size is 1mb"
    if(file.type!== 'image/jpeg' && file.type!== 'image/png')
    err = "image formate is incorrect"
    return err;
}

export const imageUpload = async(images)=>{
   
   let imgArr = [];
   for (const item of images){
       const formData= new FormData()
       formData.append("file",item)
       formData.append("upload_preset", "xtic6k9g")
       formData.append("cloud_name", "habeelwali")
       const res = await fetch("https://api.cloudinary.com/v1_1/habeelwali/image/upload",{
           method:"POST",
           body: formData
       })
       const data = await res.json()
       imgArr.push({public_id:data.public_id,url:data.secure_url})
       
   }
   return imgArr;
}