import React,{useState, useEffect} from 'react';
import './SidebarChat.css';
import { Avatar } from '@mui/material';
import {db} from './firebase';
import {Link} from "react-router-dom";
import { collection, onSnapshot, query, orderBy, addDoc} from 'firebase/firestore';

function SidebarChat({addNewChat, id, name}) {

    const [seed,setSeed] = useState("");
    const [Messages, setMessages] = useState("");
    
    useEffect(()=>{
       
        setSeed(id);
        if(id)
        {
            const collectionRef = query(collection(db,`rooms/${id}`, "messages"), orderBy("timeStamp","desc"));

            onSnapshot(collectionRef, (collectionSnap)=>{
                const allmessages = [];
                collectionSnap.forEach((doc)=>{
                    allmessages.push(doc.data());
                });
                setMessages(allmessages);
            },
    
            (error)=>{
                console.log(error);
            }
            );
        }

        

    },[id])

    async function createChat(){
        const roomName = prompt("Enter a new room name")
        if(roomName)
        {
            const docRef = await addDoc(collection(db,"rooms"),{
                name:roomName
            });
            setSeed(docRef.id);
        }
    }

    return !addNewChat ? (
    <div className='sidebarChat'>

    
        <Link to={`/rooms/${id}`}>

            <div className='sidebarChat__content'>
                <div className='Avatars'>
                    <Avatar src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${seed}`}></Avatar>
                </div>
                

                <div className='sidebarChat__info'>
                    <h1>{name}</h1>
                    <p>{Messages[0]?.message}</p>
                </div>
            </div>

        
        </Link>


    </div>
): (
    <div className='sidebarChat' onClick={createChat}>
        <h2>Add New Room</h2>
    </div>
);
}

export default SidebarChat