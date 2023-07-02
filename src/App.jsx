import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      
    </>
  );
}

export default App;
