import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input_component";
import Button from "../components/Button _component"; // Fix lỗi khoảng trắng trong tên file
import api from "../utils/api"; // Dùng API từ utils

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Dùng để chuyển hướng

  const handleLogin = async () => {
    setError(""); // Reset lỗi
    setLoading(true); // Bắt đầu loading

    try {
      const response = await api.post("/auth/login", { email, password });

      const { access_token, refresh_token, token_type, role } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("token_type", token_type);
      localStorage.setItem("role", role);

      // Chuyển hướng đến dashboard hoặc trang chính sau khi đăng nhập
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);

      if (err.response) {
        // Hiển thị lỗi từ backend
        setError(err.response.data.message || "Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // Tắt loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <div className="mb-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          text={loading ? "Logging in..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        />

        <p className="text-sm text-gray-500 text-center mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
