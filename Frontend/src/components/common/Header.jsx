import {NavLink, useNavigate} from "react-router-dom";
import "./Header.css";
import DataService from "../../api/DataService";
import { useQuery, useQueryClient } from "react-query";

async function getUser() {
  var data = await DataService.readAll("/user/get-user-info")
  if(data.status == 200) return await data.json();
  else return null;
}

export default function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery("userInfo", getUser);

  const handlelogout = function () {
    navigate("/login");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    queryClient.invalidateQueries(["userInfo"]);
  }

  return (
    <header>
    <nav className="navbar">
      <div className="navbar__links">
        {isError || isLoading || data == null && 
        <>
          <NavLink to="login">
            <button className="navbar__link-btn">Вход</button>
          </NavLink>
          <NavLink to="registration">
            <button className="navbar__link-btn">Регистрация</button>
          </NavLink>
        </>
        }
        {!isError && !isLoading && data != null &&
          <>
            <NavLink to="user" className="user__navlink">
              <button className="navbar__link-btn user__text">{data.name}</button>
            </NavLink>
            <button className="navbar__link-btn nav__exit" onClick={handlelogout}>Выход</button>
          </>
        }
      </div>
    </nav>
  </header>
  )
}