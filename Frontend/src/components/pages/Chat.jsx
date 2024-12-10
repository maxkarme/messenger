import { useEffect, useState } from "react";
import "./Chat.css";
import DataService from "../../api/DataService";
import ChatInput from "./ChatInput";

export default function Chat(props) {
    let [userId, setUserId] = useState(0);

    useEffect(() => {
        DataService.readAll("/user/get-user-info")
            .then(res => res.json())
            .then(res => setUserId(res.id));

        let subscribed = () => true;

        async function subscribe() {
            try {
                let message = await DataService.readAll(`/message/subscribe?chatId=${props.chat.id}`)

                if(message.status == 200) {
                    message = await message.json();

                    if(message != null) {
                        console.log("success!");
                        props.addMessage(message);
                    }
                }
                else console.log("null");
            } catch(error) {
            }
            finally {
                if(subscribed()) {
                    await subscribe();
                }
            }
        }
        
        subscribe();

        return () => {
            subscribed = () => false;
        }
    }, [props.chat]);

    async function sendMessage(text) {
        if(text == "") return;

        await DataService.post("/message/create", {
            text: text,
            date: new Date(),
            chatId: props.chat.id
        });
    }

    return (
        <div className="chat chat_selected">
            <div className="chat__header">
                <h3 className="chat__title">{props.chat.name}</h3>
            </div>
            <div className="chat__messages">
                <div></div>
                <div>
                    {props.chat.messages.map((m, index, array) => {
                        let checkUserName = index == 0 || array[index - 1].userInfo.name != m.userInfo.name;

                        return(
                            <div ref={(ref) => {
                                if (ref && index === array.length - 1) {
                                    ref.scrollIntoView({ behavior: 'smooth' })
                                }
                            }} className={"chat__message" + (m.userInfo.id == userId ? " chat__message_my" : "")}
                                key={m.id}>
                                {checkUserName &&
                                    <div>
                                        <span className="chat__message-user">{m.userInfo.name}</span>
                                    </div>
                                }
                                <p className="chat__message-text">{m.text}</p>
                            </div>
                    )})}
                </div>
            </div>
            <ChatInput sendMessage={sendMessage} />
        </div>
    )
}