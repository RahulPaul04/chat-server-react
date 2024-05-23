import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './chat.css'
import { addMessageAPI,deletemessageAPI,updatemessageAPI } from '../Services/allAPI'
import SERVER_URL from '../Services/server_url'

function Chat() {

    const location = useLocation()

    const {name} = location.state || ""

    const navigate = useNavigate()

    const scrollref = useRef(null)

    const [messages,setmessages] = useState([])
    const [nmessage,setnmessage] = useState("")
    const [updatewindow,setupdatewindow] = useState(false)
    const [updateval,setupdateval] = useState("")
    const [updateid,setupdateid] = useState("")
    const [sender,setsender] = useState("")
    const [time,settime] = useState("")


    const scrolltobottom = ()=>{
        if(scrollref.current){
            const scrollcontainer = scrollref.current
            scrollcontainer.scrollTop = scrollcontainer.scrollHeight
        }
    }


    const fetchmsg = async(query="")=>{
        
            let response = await fetch(`${SERVER_URL}/messages${query}`)
            let  msgs = await response.json()
            // console.log(response);
            let curr_msg = [...messages]
            for(let i = 0;i<msgs.length;i++){
                curr_msg.push(msgs[i])
            }
            setmessages(curr_msg)
            // scrolltobottom()
            console.log("fetching messages");
            fetchmsg()
            
    }

   useEffect(()=>{
    if(!name){
        navigate('/')
    }
    
    fetchmsg("?firsttime")
    // setInterval(fetchmsg,4000)

    console.log(name);
   },[])


   const deletemessage = (msgid)=>{
        deletemessageAPI(msgid)
        fetchmsg()
   }

   const updatemessage = (msgid,sender,time)=>{
    setupdatewindow(true)
    setupdateid(msgid)
    setsender(sender)
    settime(time)
    
    
   }

   const sendupdate = ()=>{

    console.log("updating message");
    let updatemsg = {
        "id":updateid,
        "sender":sender,
        "time":time,
        "message":updateval
    }
    updatemessageAPI(updateid,updatemsg)
    
    setupdateval("")
    setupdatewindow(false)
    fetchmsg()
   }

   const uploadmsg = async ()=>{
    let n_msg = {}
    const date = new Date();
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    n_msg["sender"] = name
    n_msg['message'] = nmessage
    n_msg['time'] = time

    try{
        console.log("sending message");
        const result = await addMessageAPI(n_msg)
        // console.log(result);
        if(result.status>=200 && result.status){
            // console.log(result.data);
            let narr = []
            narr = [...messages]
            narr.push(result.data)
            setmessages(narr)
            setnmessage("")
            

        }else{
            // console.log(result.response.data);
        }
        
   }
   catch(err){
    console.log(err);
   }
}

useEffect(()=>{
    scrolltobottom()
},[messages])


  return (
    <div>
        <div ref={scrollref} className='pt-3 pb-3 msg-container' style={{backgroundColor:'#292929',height:'93dvh',overflowX:'auto'}}>
            {messages && messages.map((msg,index)=>(
                <div key={index} className={`message ${msg.sender == name?'sender':'received'}` }  style={{maxWidth:"70vw",marginBottom:'25px',wordWrap:'break-word'}}>
                    <div className='d-flex align-items-end gap-2'>
                        <p className='name' style={{color:'white'}}>{msg.sender}</p>
                        <p className='time'>{msg.time}</p>
                    </div>
                    <div style={{color:'white'}} className="content">
                        <div>{msg.message}</div>
                        <div className="edit" style={{ display:`${msg.sender == name?'flex':'none'}`}}>
                        <button onClick={()=>updatemessage(msg.id,msg.sender,msg.time)} className=''><i class="fa-solid fa-pen-to-square"></i></button>

                        <button onClick={()=>deletemessage(msg.id)} className=''><i className="fa-solid fa-trash "></i></button>
                    </div>
                    </div>
                    
                </div>
            ))}
        </div>
        <div style={{height:'7dvh',backgroundColor:'#292929'}} className="chat-input d-flex">
                <input style={{backgroundColor: "#323232",color:'white'}} value={nmessage} onChange={(e)=>setnmessage(e.target.value)} type="text" className="form-control p-2 m-2" />
                <button onClick={uploadmsg} className="btn btn-primary m-2">send</button>
        </div> 
        <div className="updatewindow" style={{display:`${updatewindow?'flex':'none'}`}} >
                <div className="updatefield">
                    <input style={{backgroundColor: "#323232",color:'white'}} value={updateval} onChange={(e)=>setupdateval(e.target.value)} type="text" className="form-control p-2 m-2" />
                    <button onClick={sendupdate} className="btn btn-primary m-2">update</button>
                    <button onClick={()=>setupdatewindow(false)} className="btn btn-danger m-2">cancel</button>

                </div>
        </div>
    </div>
  )
}

export default Chat