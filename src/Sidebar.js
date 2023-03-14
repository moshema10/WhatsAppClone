import React, {useState, useEffect} from 'react';
import './Sidebar.css';
import {db} from './firebase.js';

import SidebarChat from './SidebarChat';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

import { collection, query, onSnapshot } from "firebase/firestore";
import { useUserContext } from './UserContext.js';



function Sidebar() {
    //rooms is an array which will store all the rooms from the db and populate to the ui
    const [rooms, setRooms] = useState([]);

    const {userData} = useUserContext();

    //Run it once when the component loads
    useEffect( ()=>{
        
        const q = query(collection(db, "rooms"));

        const unsub = onSnapshot(q, (querySnapshot)=>{
            const data = [];
            querySnapshot.forEach((doc)=>{
                
                data.push({id:doc.id, data:doc.data()})
            })
            setRooms(data);
        });


        return () =>{
            unsub();
        }


    },[])


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                
                <Avatar src={userData?.user.reloadUserInfo.photoUrl}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon></DonutLargeIcon>
                    </IconButton>
                    <IconButton>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                    
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                    
                </div>    

            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined></SearchOutlined>
                    <input placeholder="Search or start new chat" type="text"/>
                </div>

            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat></SidebarChat>
                {rooms.map((room)=> (
                    <SidebarChat key = {room.id} id = {room.id} name = {room.data.name}></SidebarChat>
                ))}
                

            </div>
        </div>
    )
}

export default Sidebar