import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";

const AppRoutes = () => {
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </>
    );
}

export default AppRoutes;