import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/common/Header";
import PrivateRoutes from "./services/PrivateRoutes";
import './App.css'
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import Main from "./components/pages/Main";
import User from "./components/pages/User";


function App() {
  return (
 <BrowserRouter>
        <Header/>
        <Routes path="/">
          <Route element={<PrivateRoutes role="User" />}>
            <Route index element={<Main />}/>
            <Route path="user/" element={<User/>}/>
          </Route>

          <Route path="login" element={<Login/>}/>
          <Route path="registration" element={<Registration/>}/>

        </Routes>
      </BrowserRouter>
  )
}

export default App
