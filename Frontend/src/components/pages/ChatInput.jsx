import { useState } from "react";
import "./Chat.css";

export default function ChatInput(props) {
    let [text, setText] = useState("");

    function changeHandler(e) {
        setText(e.target.value);
    }

    function formSubmit(e) {
        e.preventDefault();
        setText("");
        props.sendMessage(text);
    }

    return (
        <form className="chat__bottom" onSubmit={formSubmit}>
            <input type="text" className="chat__input" onChange={changeHandler} value={text}/>
            <button className="chat__submit">Отправить</button>
        </form>
    )
}