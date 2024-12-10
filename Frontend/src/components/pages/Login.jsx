import { useState } from "react";
import "./Login.css"
import "./Form.css"
import { useNavigate } from "react-router";
import { useQueryClient } from "react-query";

export default function Login() {
    const queryClient = useQueryClient();
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
            queryClient.invalidateQueries(["userInfo"]);
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
        <div className="form">
            <h2 className="form__title">Вход</h2>
            <form className="form__form" onSubmit={submitHandler}>
                <div className="form__input-block">
                    <span className="form__span"> логин</span>
                    <input type="text" name="login" className="form__input" autoComplete="off" onChange={changeHandler} value={formState.login}/>
                </div>
                <div className="form__input-block">
                    <span className="form__span">пароль</span>
                    <input type="password" name="password" className="form__input" autoComplete="off" onChange={changeHandler} value={formState.password}/>
                </div>
                <button className="form__submit">Войти</button>
            </form>
        </div>
    )
}