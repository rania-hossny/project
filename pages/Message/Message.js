import React, { useRef } from 'react';
import io from "socket.io-client"
import Header from '../../Components/Navbar/Navbar';
import Chat from './Chat';
import ChatOnline from "./ChatOnline"
import Conversation from './Conversation';
import {useState,useEffect} from "react"
// import {ChatEngine}  from 'react-chat-engine';
import "./messenger.css"; 
import chatimg from "./undraw_Chat_re_re1u.png"
import queryString from "query-string"



const Message = ({location}) => {
  const {userId}=queryString.parse(location.search)
  const myid=localStorage.getItem("id")
//  const userid=props.match.params.id;
  // console.log("userid",props.match.params.id)
 const [s, setSocket] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const token = localStorage.getItem("token");
 const [newMessege, setNewMessege] = useState("")
  const [currentChat,setCurrentChat]=useState(null)
  const [message,setMessage]=useState([])
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const[conversations,setConversations]=useState([])
  const[conversations2,setConversations2]=useState([])
  const scrollRef=useRef()

 

  useEffect(() => {
   const Socket= io('https://boiling-shelf-43809.herokuapp.com/chat');
    Socket.on('connect', () => {
      Socket.emit('authenticate',{token:token })
      
    });
    Socket.on("new message",(data)=>{
         console.log("data",data)
        //  try{
        //   fetch(`https://boiling-shelf-43809.herokuapp.com/conversations/${currentChat.id}/messages`,{
        //     headers:{
        //       "authorization":`${token}`
        //     }
        //   }).then(resp=>resp.json())
        //   .then(result=>{
        //     // console.log("messages",result)
        //  let m=result[0]
        //   m.content=data.message.content
        //  setMessage([...message,m])
        //     // setNewMessege("")
        //   })
        // } catch(err){
        //   console.log(err)
        // }
       
       })
    console.log(Socket)
      setSocket(Socket) 
    
  }, [])
  console.log(userId)
  // useEffect(() => {
  //   setNewMessege(arrivalMessage?.content)
  // }, [arrivalMessage])


 useEffect(() => {
  
  getconversations();
  getconversations2()
  // console.log(conversations.length)
}, [newMessege])

const getconversations=()=>{
  fetch("https://boiling-shelf-43809.herokuapp.com/conversations",{
      headers:{"authorization":`${token}`}
  }).then(res=>res.json())
  .then(result=>{
    // console.log(result)
    setConversations(result)
  })
}

const getconversations2=()=>{
  fetch("https://boiling-shelf-43809.herokuapp.com/conversations/?id=60f06d2a271a3e00228914e0",{
      headers:{"authorization":`${token}`}
  }).then(res=>res.json())
  .then(result=>{
    // console.log("result2",result)
    // setConversations(result)
    setConversations2(result)
  })
}

useEffect(() => {
  
  getMessages()
}, [currentChat])

const getMessages= ()=>{
  try{
    fetch(`https://boiling-shelf-43809.herokuapp.com/conversations/${currentChat.id}/messages`,{
      headers:{
        "authorization":`${token}`
      }
    }).then(resp=>resp.json())
    .then(result=>{
      console.log("messages",result)
      setMessage(result)
      setNewMessege("")
    })
  } catch(err){
    console.log(err)
  }
}
const receivedId=currentChat?.users[0].id !==myid ? currentChat?.users[0].id:currentChat?.users[1].id
// console.log("currentid",receivedId)

const handlesendmsg=(message)=>{
  console.log(message)
   s?.emit("private",{
     to:receivedId,
     content:message
   })
   getMessages();
   getconversations();
}

 useEffect(() => {
   scrollRef.current?.scrollIntoView({behavior:"smooth"})
 }, [message])
console.log("currentchat",currentChat)

// useEffect(() => {
//   const handlechat=()=>{
//     // console.log(userId)
    
//         fetch(`https://boiling-shelf-43809.herokuapp.com/check-conversations/60ec4543e2a22700229519b5`,
//        { headers:{"authorization":`${token}`}}
//         ).then(resp=>{
//             if(!resp.ok){
//                 throw Error("error")
//             }
//            return resp.json();
//         })
//         .then(result=>{
//         console.log("chat",result)})
//         .catch(err=>{
//             // history.push(`/Message/${userId}`)
//             console.log(err.message)})
    
//   }
//   handlechat()
// },[])
  return (
      <>
      <Header/>
        <div className="messeger">
    <div className="chatMenu">
      <div className="chatMenuWrapper">
        <input placeholder="search for friends" className="chatMenuInput"/>
        {
         conversations.length == 0 ?
         <> 
              <div>no conversations</div>  
         </>:   
                <Conversation conversations={conversations} setCurrentChat={setCurrentChat} conversations2={conversations2}/>
        }
        
      
      </div>
    </div>
    <div className="chatBox">
    <div className="chatBoxWrapper">
      {
        currentChat? <>
        <div className="headerChat">
          <img className="headerChatimg" src={currentChat.users[0].id !== myid? currentChat.users[0].url :currentChat.users[1].url}/>
          <p className="headerChatTitle">{currentChat.users[0].id !== myid? currentChat.users[0].name :currentChat.users[1].name}</p>
        </div>
        <div className="chatBoxTop">
          {
           message.length!==0 && message.map((m)=>(
             <div ref={scrollRef}>
              <Chat message={m} own={m.user.id === myid}/>

             </div>
            )).reverse()
          }
           
        </div>
        </> : (
        <div className="startconvsection">
          <img className="startconvsectionImg" src={chatimg}/>
          <p className="startconvsectionTitle">start conversation</p>
        </div>
        )
}
      <div className="chatBoxBottom">
        <textarea className="chatMessageInput" 
        placeholder="write some thing ..." 
        onChange={(e)=>setNewMessege(e.target.value)}
        value={newMessege}
        ></textarea>
        <button 
        onClick={()=>handlesendmsg(newMessege)} 
        className="chatSubmitButton">Send</button>
      </div>
      
      
        
    </div>
    </div>
    {/* <div className="chatOnline">
      <div className="chatOnlineWrapper">
        <ChatOnline/>
      </div>
    </div> */}
  </div>
      </>
  )
}
export default Message;