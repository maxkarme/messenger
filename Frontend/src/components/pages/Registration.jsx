import "./Login.css"
import "./Form.css"
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Registration() {
    const navigate = useNavigate();
    const [formState, changeFormState] = useState({
        name: "",
        login: "",
        password: "",
        accessPassword: ""
    });

    async function submitHandler(e) {
        e.preventDefault();

        if(formState.password != formState.accessPassword) {
            alert("Пароли не совпадают!");
        }

        const requestParams = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Login: formState.login,
              Password: formState.password,
              Name: formState.name
            }),
          };

          const response = await fetch(
            "http://localhost:5036/user/create",
            requestParams
          );
          
          if (response.status === 200) {
            window.dispatchEvent(new Event("storage"));
            navigate("/login");
          } else {
            alert("Пользователь с таким логином уже есть");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
    }

    function changeHandler(e) {
        changeFormState({...formState, [e.target.name]: e.target.value});
    }

    return (
        <div className="form">
            <h2 className="form__title">Регистрация</h2>
            <form className="form__form" onSubmit={submitHandler}>
                <div className="form__input-block">
                    <span className="form__span">имя</span>
                    <input type="text" name="name" className="form__input" autoComplete="off" value={formState.name} onChange={changeHandler}/>
                </div>
                <div className="form__input-block">
                    <span className="form__span">логин</span>
                    <input type="text" name="login" className="form__input" autoComplete="off" value={formState.login} onChange={changeHandler}/>
                </div>
                <div className="form__input-block">
                    <span className="form__span">пароль</span>
                    <input type="password" name="password" className="form__input" autoComplete="off" value={formState.password} onChange={changeHandler}/>
                </div>
                <div className="form__input-block">
                    <span className="form__span">подтверждение пароля</span>
                    <input type="password" name="accessPassword" className="form__input" autoComplete="off" value={formState.accessPassword} onChange={changeHandler}/>
                </div>
                <button className="form__submit">Зарегистрироваться</button>
            </form>
        </div>
    )
}