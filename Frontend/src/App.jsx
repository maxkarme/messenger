import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/common/Header";
import PrivateRoutes from "./services/PrivateRoutes";
import './App.css'
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import Main from "./components/pages/Main";

function App() {
  return (
 <BrowserRouter>
        <Header/>
        <Routes path="/">
          <Route element={<PrivateRoutes role="User" />}>
            <Route index element={<Main />}/>
          </Route>

          <Route path="login" element={<Login/>}/>
          <Route path="registration" element={<Registration/>}/>

        </Routes>
      </BrowserRouter>
  )
}

export default App
