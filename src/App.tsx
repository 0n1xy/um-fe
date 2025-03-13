import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/Login_page";
import Register from "./page/Register_page";
import Dashboard from "./page/DashBoard_page";
import Me from "./page/Me_page";
import ProtectedRoute from "./routes/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Chỉ cho phép user vào trang /me */}
      <Route element={<ProtectedRoute requiredRole="user" />}>
        <Route path="/me" element={<Me />} />
      </Route>

      {/* Chỉ cho phép admin vào trang /dashboard */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Nếu user vào trang không tồn tại, điều hướng về /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
