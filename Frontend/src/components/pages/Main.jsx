import { useState } from "react";
import Chat from "./Chat";
import ChatList from "./ChatList";
import "./Main.css";

export default function Main() {
    const [selectedChat, setSelectedChat] = useState(null);

    function selectChat(chat) {
        setSelectedChat(chat);
    }

    function addMessage(message) {
        setSelectedChat(prev => ({
            ...prev,
            messages: [...prev.messages, message]
        }));
    }

    function getSelectedId() {
        return selectedChat.id;
    }

    return (
        <div className="main__wrap">
            <div className="left">
                <ChatList selectedChat={selectedChat} selectChat={selectChat}/>
            </div>
            <div className="right">
                {selectedChat != null && 
                    <Chat chat={selectedChat} addMessage={addMessage} getSelectedId={getSelectedId}/>
                }
            </div>
        </div>
    )
}