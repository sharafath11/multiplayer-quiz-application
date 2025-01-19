import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/ Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import Leaderboard from "./pages/Leaderboard";
import RandomQzPage from "./pages/RandomQzPage";
import QzEnter from "./pages/QzEnter";
import { ToastContainer } from "react-toastify";
import Ai from "./pages/Ai";
import NoQuestionsPage from "./components/NoQuestionsPage";
import MultyPlayer from "./pages/MultyPlayer";


function App() {
  const token=localStorage.getItem("token")
  console.log(token)
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/ai" element={token? <Ai/>:<LoginPage/>} />
        <Route path="/no-qustion" element={<NoQuestionsPage/>}/>
        <Route path="/categories" element={<CategoriesPage/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/multiplayer" element={<MultyPlayer/>}/>
        <Route path="/RandomQzPage/:cat" element={token? <RandomQzPage/>:<LoginPage/>}/>
        <Route path="/RandomQz-start/:cat" element={token?<QzEnter/>:<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
