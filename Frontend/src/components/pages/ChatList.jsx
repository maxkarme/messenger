import { useEffect, useState } from "react";
import "./ChatsList.css";
import Modal from "../common/Modal";
import "./Form.css";
import DataService from "../../api/DataService";
import SearchComponent from "../common/SearchComponent";

export default function ChatList(props) {
    let [chats, setChats] = useState([]);
    let [participants, setParticipants] = useState([]);

    useEffect(() => {
        DataService.readAll("/user/get-user-info")
            .then(res => res.json())
            .then(res => setParticipants([...participants, {
                id: res.id,
                name: res.name
            }]));

        DataService.readAll("/chat/get-user-chats")
            .then(res => res.json())
            .then(res => setChats(res));
    }, [])

    let [chatFilter, setFilter] = useState("");
    let [modalHidden, setModalHidden] = useState(true);
    let [searchHidden, setSearchHidden] = useState(true);

    let [addData, setAddData] = useState({
        name: ""
    })

    function changeFilter(e) {
        setFilter(e.target.value);
    }

    function wrapClick() {
        setModalHidden(true);
    }

    function addChat() {
        setModalHidden(false);
    }

    function changeFormHandler(e) {
        setAddData({...addData, [e.target.name]: e.target.value});
    }

    async function formSubmit(e) {
        e.preventDefault();
        
        let chat = await DataService.post("/chat/create-chat", {
            name: addData.name
        });

        chat = await chat.json();

        await DataService.post(`/chat/add-users?chatId=${chat.id}`, participants.map(p => p.id));
        window.location.reload();
    }

    async function getParticipants(filter) {
        let res =  await DataService.post("/user/get-by-filter", {
            name: filter,
            login: null
        });

        res = await res.json();

        return res
            .filter(elem => participants.find(p => p.id == elem.id) == null)
            .map(elem => ({
                id: elem.id,
                text: elem.name
            }));
    }

    function addParticipantClick() {
        setSearchHidden(false);
    }

    function formClick(e) {
        if(e.target.classList.contains("add-chat")) {
            setSearchHidden(true);
        }
    }

    function selectParticipant(selected) {
        setParticipants([...participants, {
            id: selected.id,
            name: selected.text
        }]);

        setSearchHidden(true);
    }

    function deletePriticipant(id) {
        setParticipants(participants.filter(p => p.id != id));
    }

    return (
        <>
            <Modal hidden={modalHidden} wrapClick={wrapClick}>
                <form className="add-chat" onSubmit={formSubmit} onClick={formClick}>
                    <h3 className="add-chat__title">Создать чат</h3>
                    <div className="form__input-block">
                        <span className="form__span">Название</span>
                        <input type="text" name="name" className="form__input" autoComplete="off" onChange={changeFormHandler} value={addData.name}/>
                    </div>

                    <div className="add-chat__participants">
                        <h3 className="add-chat__participants-title">Участники</h3>

                        {searchHidden && 
                            <button className="add-chat__button" onClick={addParticipantClick}>Добавить участника</button>
                        }
                        
                        {!searchHidden && 
                            <div className="add-chat__search-wrap">
                                <SearchComponent getResult={getParticipants} onSelect={selectParticipant}/>
                            </div>
                        }

                        <div className="add-chat__participants-block">
                            {participants.map(p => (
                                <div className="add-chat__participant-item" key={p.id}>
                                    <p className="add-chat__participant-name">{p.name}</p>
                                    <button className="add-chat__participant-close" onClick={deletePriticipant.bind(null, p.id)}>x</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="form__submit">Сохранить</button>
                </form>
            </Modal>
            <div className="chat-list__wrap">
                <div className="chat-selector">
                    <input type="text" className="chat-selector__input" value={chatFilter} onChange={changeFilter} />
                    <button className="chat-selector__create" onClick={addChat}>Добавить чат</button>
                </div>
                <div className="chats-list">
                    {chats
                    .filter(chat => chat.name.indexOf(chatFilter) != -1)
                    .map(chat => {
                        let chatClass = "chats-list__chat";
                        if(props.selectedChat != null && props.selectedChat.id == chat.id) {
                            chatClass += " chats-list__chat_selected";
                        }

                        return(
                            <div className={chatClass} key={chat.id} onClick={props.selectChat.bind(null, chat)}>
                                <p className="chats-list__name">{chat.name}</p>
                                {/* {chat.messages.length > 0 &&
                                    <p className="chats-list__text">{chat.messages[chat.messages.length - 1].text}</p>
                                }
                                {chat.messages.length == 0 &&
                                    <p className="chats-list__text">В этом чате пока нет сообщений</p>
                                } */}
                            </div>
                    )})}
                </div>
            </div>
        </>
    )
}