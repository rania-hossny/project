import React from 'react'
import "./chat.css"
import image from "./image.jpg"
const Chat = ({message,own}) => {
    return (
        <div className={own ? "messege own" :"messege"}>
            <div className="messegeTop">
                <img className="messegeImg" src={message.user.url}/>
             <p className="messegeText">{message.content}</p>        
            </div>
            <div className="messegeBottom">
                {message.createdAt}
            </div>
        </div>
    )
}

export default Chat
