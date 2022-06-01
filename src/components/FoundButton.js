import React from 'react'
import './card.css'
function FoundButton({found,handlFound,handlUnFound}) {
  return (
    <>
    
        {found ?(
            <img  className="found" src="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-raising-hand-light-skin-tone.png" alt="" onClick={handlUnFound}/>
          ) : (
            <img className="found" src="https://p.kindpng.com/picc/s/608-6080151_facepalm-girl-png-photos-emoji-girl-hand-on.png" alt="" onClick={handlFound}/>
          )}
    
    </>
  )
}

export default FoundButton