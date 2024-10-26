import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React from "react";

export default function AllChats() {

    const [state, setState] = React.useState(1)

    const deleteSession = (chat) => {
        let currentChats = localStorage.getItem("chats").split(",")
        currentChats.splice(currentChats.indexOf(chat), 1)
        if (currentChats.length === 0) {
            localStorage.removeItem("chats")
            setState(state+1)
            return
        }
        localStorage.setItem("chats", currentChats)
        setState(state+1)
    }

    const navigate = useNavigate();
    if (localStorage.getItem("chats") !== null) {
        console.log(localStorage.getItem("chats"))
        let chats = localStorage.getItem("chats").split(',')
        return (
            chats.map((value) => {
                return(
                    <div className='sessions'>
                        <p className="session-button" onClick={() => deleteSession(value)}></p>
                        <p style={{width: "80%", overflowX: "hidden"}} onClick={() => {
                        localStorage.setItem("currentChat", value)
                        console.log(localStorage.getItem("currentChat"))
                        navigate('chat')
                        navigate(0)
                    }}>Айди сессии: {value}</p>
                    </div>
                )
            })
        )
    }
    
}
