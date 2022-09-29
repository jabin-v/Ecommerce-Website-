import React, { useEffect, useState } from "react";
import "./userChat.css";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

import { formControlLabelClasses } from "@mui/material";
import socketIOClient from "socket.io-client";
const UserChat = () => {
  const [socket, setSocket] = useState(false);

  const [chat, setChat] = useState(false);
  const [visible, setVisible] = useState(false);
  //users messages
  const [userMessages, setUserMessage] = useState([]);

  //unread message

  const [messageRecieved, setMessageRecieved] = useState(false);




  

  const handleOpenChatBox = () => {
    setVisible(true);
    setChat(true);
    setMessageRecieved(false)
    // setUserMsgs([])
  };

  const handleCloseChatBox = () => {
    setVisible(false);
    setChat(false);
  };

  // ============================socket area======================================

  useEffect(() => {
    const socket = socketIOClient("https://dry-fortress-44491.herokuapp.com");
    

    //@@@@@2hen admin is not online

    socket.on("no admin",(msg=>{
      setUserMessage((chat) => {
        return [...chat, { admin: "we will be online soon" }];
      });

    }));
    

    /* @@@@@@@@listening to admin message@@@@@@@@@@@@@*/

    socket.on("server sends message from admin to client", (message) => {
      setUserMessage((chats) => {
        return [...chats, { admin: message.message }];
      });

      setMessageRecieved(true)
    });

    //socket will disconnet when closing the page
    setSocket(socket);
    return () => socket.disconnect();
  }, [])

  //client sending messege to admin
  const clientSubmitChatMsg = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return;
    }

    const msg = document.getElementById("clientChatMsg");

    let v = msg.value.trim();

    console.log(msg.value);

    if (v === "" || v === null || v === false || !v) {
      return;
    }
    msg.focus();
    setMessageRecieved(false)
    setTimeout(() => {
      msg.value = "";
      const chatMessages = document.querySelector(".chat-msg");

      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 150);

    socket.emit("client sends message", v);
    setUserMessage((chat) => {
      return [...chat, { client: v }];
    });
  };

  return (
    <div>
      {!chat && (
        <div className="chat-btn" onClick={handleOpenChatBox}>
          <ChatIcon />
        </div>
      )}

      {chat && (
        <div className="chat-btn" onClick={handleCloseChatBox}>
          <CloseIcon />
        </div>
      )}
     { messageRecieved && <span className="indicator"></span>}

      {visible && (
        <div className="chat-wrapper">
          <div className="chat-header">
            <h6>Let's Chat - online</h6>
          </div>
          <div className="chat-form">
            <div className="chat-msg has-scrollbar">
              {userMessages.map((item, id) => (
                <div key={id}>
                  {item.client && (
                    <p>
                      <b>You :</b> {item.client}{" "}
                    </p>
                  )}
                  {item.admin && (
                    <p className="bg-primary ">
                      {" "}
                      <b>Support :</b> {item.admin}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <textarea
            id="clientChatMsg"
            className="form-control"
            placeholder="Yout Text Message"
            onKeyUp={(e) => clientSubmitChatMsg(e)}
          ></textarea>
          <button
            className="btn btn-success"
            onClick={(e) => clientSubmitChatMsg(e)}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserChat;
