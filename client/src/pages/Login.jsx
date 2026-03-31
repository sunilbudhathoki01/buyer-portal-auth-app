import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Login response", res);
      const data = res.data;
      const payload = data?.data ?? data;
      const token = payload?.token;

      if (!token) {
        console.error("Unexpected login response payload", payload);
        throw new Error(
          "Login failed: token not found in response. Check server response format.",
        );
      }

      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error", error);
      const serverMessage =
        error.response?.data?.message || error.response?.data || "";
      alert(serverMessage || error.message || "login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full mb-4 p-2 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
