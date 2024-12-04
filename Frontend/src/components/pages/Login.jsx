import { useState } from "react";
import "./Login.css"
import "./Form.css"
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();
    const [formState, changeFormState] = useState({
        login: "",
        password: ""
    });

    async function submitHandler(e) {
        e.preventDefault();

        const requestParams = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({Login: formState.login, Password: formState.password}),
        };
        const response = await fetch("http://localhost:5036/user/login", requestParams);
        const result = await response.text();
        if (response.status === 200) {
            localStorage.setItem("token", result);
            localStorage.setItem("user", formState.login);
            window.dispatchEvent(new Event("storage"));
            navigate("/");
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }

    function changeHandler(e) {
        changeFormState({...formState, [e.target.name]: e.target.value});
    }

    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={submitHandler}>
                <div className="login__input-block">
                    <span className="login__span"> логин</span>
                    <input type="text" name="login" className="login__input" autoComplete="off" onChange={changeHandler} value={formState.login}/>
                </div>
                <div className="login__input-block">
                    <span className="login__span">пароль</span>
                    <input type="password" name="password" className="login__input" autoComplete="off" onChange={changeHandler} value={formState.password}/>
                </div>
                <button className="login__submit">Войти</button>
            </form>
        </div>
    )
}