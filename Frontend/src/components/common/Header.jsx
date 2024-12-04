import {NavLink, useNavigate} from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  const handlelogout = function () {
    window.location.reload();
    navigate("/login");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}
  return (
    <header>
    <nav className="navbar">
      <div className="navbar__links">
        <NavLink to="login">
          <button className="navbar__link-btn">Вход</button>
        </NavLink>
        <NavLink to="registration">
          <button className="navbar__link-btn">Регистрация</button>
        </NavLink>
      </div>
    </nav>
  </header>
  )
}