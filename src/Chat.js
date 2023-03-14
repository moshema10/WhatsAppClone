import { Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVert from '@mui/icons-material/MoreVert';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import Mic from '@mui/icons-material/Mic';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import { db } from './firebase';
import { collection, doc, onSnapshot, query, orderBy, addDoc, serverTimestamp} from 'firebase/firestore';
import { useUserContext } from './UserContext.js';


export default function Chat() {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const roomid = useParams("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const {userData} = useUserContext();
    

    

    useEffect(() => {

        
        let unsubscribe;
        let unsubscribe2;
        function getDatawithID() {
          const docRef = doc(db, "rooms", roomid.roomid);
          unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              
              setRoomName(docSnap.data().name);
              setSeed(roomid.roomid);
              
            } else {
              console.log("No data retrieved");
            }
          });
        }

        function getMessagewithID() {
            const collectionRef = query(collection(db,`rooms/${roomid.roomid}`, "messages"), orderBy("timeStamp"));

            unsubscribe2 = onSnapshot(collectionRef, (collectionSnap)=>{
                const allmessages = [];
                collectionSnap.forEach((doc)=>{
                    allmessages.push(doc.data());
                });
                setMessages(allmessages);
            },

            (error)=>{
                console.log(error);
            }
            )
    


        };
      
        if (roomid.roomid) {
          getDatawithID();
          getMessagewithID()
          console.log(userData.user.reloadUserInfo.displayName);
        }
      
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
          if (unsubscribe2) {
            unsubscribe2();
          }
        };
    }, [roomid.roomid]);

    

    async function addMessage(){
        const newMsgRef = await addDoc(collection(db,`rooms/${roomid.roomid}`,"messages"),{
            message: input,
            name: userData.user.reloadUserInfo.displayName,
            timeStamp: serverTimestamp()
        });

        console.log("New Message ID: ", newMsgRef.id);
    
    }

    function convertTime(timestamp){
        return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, month:'numeric', day:'numeric', year:'numeric' }).format(timestamp?.toDate());
        
    }

    function sendMessage(e){
        e.preventDefault();
        console.log("You typed in >> ", input)
        addMessage();
        setInput("");
    }

    return (
        <div className="chat">
            <div className='chat__header'>
                <Avatar className='chat__headerAvatar' src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${seed}`}></Avatar>
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last activity {convertTime(messages[messages.length-1]?.timeStamp)}</p>
                </div>
                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlined></SearchOutlined>
                    </IconButton>
                    <IconButton>
                        <AttachFile></AttachFile>
                    </IconButton>

                    <IconButton>
                        <MoreVert></MoreVert>
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>

                {
                
                messages.map(msg=>(
                    <p className={`chat__bodyMessage ${userData.user.reloadUserInfo.displayName === msg.name && "chat__bodyMessageReciever"}`}>
                        <span className='chat__bodyMessage__name'>{msg.name}</span>
                        {msg.message}
                        <span className='chat__bodyMessage__timestamp'>
                            {convertTime(msg?.timeStamp)}
                        </span>
                    </p>
                ))
                
                }







            </div>

            <div className='chat__footer'>
                <InsertEmoticon></InsertEmoticon>
                <form>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message...'></input>
                    <button onClick={sendMessage} type='submit'></button>
                </form>
                <Mic></Mic>

            </div>

        </div>
    )
}
