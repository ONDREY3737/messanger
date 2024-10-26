import React, { useEffect } from "react";
import "./components/maprender"
import AllChats from "./components/maprender";
import { v4 as uuidv4 } from 'uuid';


function App() {

  let [state, setState] = React.useState(1)

  let newChat = () => {
    if (localStorage.getItem("chats") !== null) {
      let currentChats = localStorage.getItem("chats").split(",")
      let newChat = (document.getElementById("session_id").value)
      currentChats.push(newChat)
      localStorage.setItem("chats", currentChats)
    }
    else {localStorage.setItem("chats", document.getElementById("session_id").value)}
    setState(state+1)
  }

  return (
    <div className="all-chats">
      <AllChats></AllChats>
      <div className="create-new-chat">
        <div>
          <label style={{fontSize: "larger", color: "white", marginRight: "10px"}}for="session_id">Введите session id:</label>
          <input className="create-input" type="text" id="session_id"></input>
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
         <button className="create-new-butt" onClick={() => newChat()}>Начать новый чат</button>
        </div>
    </div>
  );
}

export default App;
