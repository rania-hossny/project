import React,{useState} from 'react'
import "./conversation.css"
import image from "./image.jpg" 

const Conversation = ({conversations,setCurrentChat,conversations2}) => {
    console.log("conv",conversations)
    console.log("conversations2",conversations2)
    // const [item, setitems] = useState({})

    const myid=localStorage.getItem("id")
    return (
        <>
        {
            conversations.map((item,ind)=>{
                return(
                 
                        <div key={item.id} className="conversation" onClick={()=>setCurrentChat(item)}>
                        
                        <img className="conversationImg" src={item.users[0].id !== myid? item.users[ind=0].url : item.users[ind=1].url} alt=""/>
                        <div>
                        <span className="conversationName">{item.users[ind=0].id !== myid? item.users[ind=0].name : item.users[ind=1].name}</span>
                        <p style={{color:"gray"}}>{item.lastMessage?.content ? item.lastMessage.content : null}</p>
                        </div>
                    </div>
                    
                )
            })
        }
        
       </>
        
    )
}

export default Conversation
