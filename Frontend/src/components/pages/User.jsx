import { useEffect, useState } from "react";
import DataService from "../../api/DataService";
import "./User.css";
import { useQueryClient } from "react-query";

export default function User() {
    const queryClient = useQueryClient();

    let [user, setUser] = useState({
        name: "",
        login: "",
    });

    let [buttonState, setButtonState] = useState("default");

    useEffect(() => {
        DataService.readAll("/user/get-user-info")
            .then(res => res.json())
            .then(info => {
                setUser({
                    name: info.name,
                    login: info.login,
                });
            })
    }, []);

    function changeHandler(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    async function saveChanges(e) {
        e.preventDefault();
        let response = await DataService.post("/user/update-user", user);

        if(response.status == 200) {
            queryClient.invalidateQueries(["userInfo"]);
            setButtonState("success");
            setTimeout(() => {
                setButtonState("default");
            }, 1000);
        }
        else {
            setButtonState("error");
            setTimeout(() => {
                setButtonState("default");
            }, 1000);
        }
    }

    return (
        <form className="user-form" onSubmit={saveChanges}>
            <div className="user-form__block" >
                <label htmlFor="user-name" className="user-form__label">Имя:</label>
                <input type="text" className="user-form__input" 
                    name="name" onChange={changeHandler} 
                    value={user.name} id="user-name" autoComplete="off"/>
            </div>

            
            <div className="user-form__block">
                <label htmlFor="user-login" className="user-form__label">Логин:</label>
                <input type="text" className="user-form__input" 
                    name="login" onChange={changeHandler} 
                    value={user.login} id="user-login" autoComplete="off"/>
            </div>
            {buttonState == "default" &&
                <button className="user-form__submit">Сохранить</button>
            }

            {buttonState == "success" &&
                <button className="user-form__submit user-form__submit_success">Изменения сохранены!</button>
            }
            
            {buttonState == "error" &&
                <button className="user-form__submit user-form__submit_error">Ошибка</button>
            }
        </form>
    )
}