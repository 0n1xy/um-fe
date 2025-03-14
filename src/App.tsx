import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/Login_page";
import Register from "./page/Register_page";
import Dashboard from "./page/DashBoard_page";
import Me from "./page/Me_page";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRedirect from "./routes/AuthRedirect";

const App = () => {
  return (
    <Routes>
      {/* Trang Login & Register */}
      <Route element={<AuthRedirect />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Routes bảo vệ */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<ProtectedRoute requiredRole="user" />}></Route>
      <Route path="/me" element={<Me />} />
      {/* Trang mặc định nếu không khớp */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
