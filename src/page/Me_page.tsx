import React, { useEffect, useState } from "react";
import api from "../utils/api";

interface User {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  isAdmin: number; // 0 = admin, 1 = user
}

const Me: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get("/auth/me"); // API lấy thông tin user hiện tại
      setUser(response.data);
    } catch (err) {
      setError("Failed to load user info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : user ? (
          <div>
            <p className="text-lg">
              <strong>ID:</strong> {user.id}
            </p>
            <p className="text-lg">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg">
              <strong>Date of Birth:</strong> {user.dateOfBirth}
            </p>
            <p className="text-lg">
              <strong>Role:</strong>{" "}
              <span
                className={`px-3 py-1 text-white rounded-md ${
                  user.isAdmin === 0 ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                {user.isAdmin === 0 ? "Admin" : "User"}
              </span>
            </p>
          </div>
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Me;
