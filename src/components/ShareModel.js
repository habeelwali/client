import React from 'react'
import  {
  EmailShareButton,EmailIcon,
  FacebookShareButton, FacebookIcon,
  TelegramShareButton,TelegramIcon,
  TwitterShareButton,TwitterIcon,
  WhatsappShareButton,WhatsappIcon,
 
 } from 'react-share'
function ShareModel({url}) {
  return (
    <div style={{display: 'flex',justifyContent:'space-between', padding:'10px',backgroundColor:'#eee'}}>
      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32}/>
      </FacebookShareButton>
      <EmailShareButton url={url}>
        <EmailIcon round={true} size={32}/>
      </EmailShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon round={true} size={32}/>
      </TelegramShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32}/>
      </TwitterShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon round={true} size={32}/>
      </WhatsappShareButton>
    </div>
  )
}

export default ShareModel