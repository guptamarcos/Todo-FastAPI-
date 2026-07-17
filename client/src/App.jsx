import Hero from "./component/Hero.jsx";
import Signup from "./component/Signup.jsx";
import Login from "./component/Login.jsx";

import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/todos" replace/>} />
        <Route path="/todos" element={<Hero/>} />
        <Route path="/todos/register" element={<Signup />} />
        <Route path="/todos/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
