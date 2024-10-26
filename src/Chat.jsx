import React, { useEffect } from "react";
import ChatHistory from "./components/ChatHistory";
import "./styles.css"
import * as Paho from 'paho-mqtt';
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router'

export let history = []


export let client = new Paho.Client("broker.emqx.io", 8083, uuidv4());

client.connect({
    onSuccess() {
      console.log('Connection established');
      client.subscribe(localStorage.getItem("currentChat")); // ПЕРЕМЕСТИТЬ ИЗ ONSUCCEESS В ПРОСТО ФУНКЦИЮ 
    },
    onFailure(error) {
      console.error(error);
    },
  });



function Chat() {

    const navigate = useNavigate()

    let [state, setState] = React.useState(1)

    client.onMessageArrived = (message) => {
        console.log(document.getElementById("message").value, message.payloadString)
        if (message.payloadString !== document.getElementById("message").value) {history.push({message: message.payloadString, thisUser: 0})}
        else {document.getElementById("message").value = ""
        }
        setState(state + 1)
      };

    let sendMessage = (event, click) => {
        if (event.key === "Enter") {
            history.push({message: document.getElementById("message").value, thisUser: 1})
            let message = new Paho.Message(document.getElementById("message").value);
            message.destinationName = localStorage.getItem("currentChat");
            client.send(message);
        }
        else if (click === "clicked") {
            history.push({message: document.getElementById("message").value, thisUser: 1})
            let message = new Paho.Message(document.getElementById("message").value);
            message.destinationName = localStorage.getItem("currentChat");
            client.send(message);
        }

        
    }

    useEffect(() => {
        let objDiv = document.getElementById("chat");
        console.log(document.getElementById("chat").scrollHeight)
        objDiv.scrollTop = objDiv.scrollHeight;
    })

    return (
        <div className="chat-page">
            <button className="chat-back" onClick={() => {
                history = []
                navigate('/')
                navigate(0)
            }}></button>
            <div className="chat-head">
                <p>Айди сессии: {localStorage.getItem("currentChat")}</p>
            </div>
            <div className="chat" id="chat">
                <p style={{width: "100%"}}>
                <ChatHistory data={history} className="messages"></ChatHistory>
                </p>
            </div>
            <div className="chat-footer">
                <div className="send-butt">
                    <input onKeyDown={(event) => sendMessage(event)} className="message" type="text" id="message"></input>
                    <p className="chat-butt" onClick={(event) => sendMessage(event, "clicked")}></p>
                </div>  
            </div>
        </div>
    )
}

export default Chat