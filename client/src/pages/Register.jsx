import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/auth/register",
        form,
      );
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold  mb-6 text-center">Register</h2>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Enter your address"
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={(e) => {
            setForm({ ...form, address: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Enter email"
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="w-full mb-4 p-2 border rounded-lg"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-800"
        >
          Register
        </button>
        <p className="text-sm text-center mt-4">
          Already have an acoount?
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
