import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UploadSingelFile from "./components/UploadSingelFile";
import SignUp from "./pages/login-signin/SignUp";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/login-signin/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
