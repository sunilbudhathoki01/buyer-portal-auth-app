import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Favourites from "./pages/Favourites";
import AddProperty from "./pages/AddProperty";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/add-property" element={<AddProperty />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
