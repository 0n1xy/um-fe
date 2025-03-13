import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

interface User {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  isAdmin: number; // 0 = admin, 1 = user
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page] = useState(1);
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/admin/users?page=${page}&per_page=20&search=${search}`
      );
      setUsers(response.data.users);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: number) => {
    try {
      const response = await api.get(`/admin/users/${id}`);
      setModalUser(response.data);
      setShowModal(true);
    } catch (err) {
      alert("Failed to fetch user data.");
    }
  };

  const handleUpdate = async () => {
    if (!modalUser) return;
    try {
      await api.put(`/admin/users/${modalUser.id}`, {
        name: modalUser.name,
        email: modalUser.email,
        dateOfBirth: modalUser.dateOfBirth,
        isAdmin: modalUser.isAdmin,
      });

      setShowModal(false);
      fetchUsers();
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search user..."
          className="border px-4 py-2 rounded-md w-1/3 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Date of Birth</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.dateOfBirth}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-white rounded-md ${
                        user.isAdmin === 0 ? "bg-green-500" : "bg-gray-500"
                      }`}
                    >
                      {user.isAdmin === 0 ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => fetchUserById(user.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && modalUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-25 shadow-xl">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update User</h2>

            {/* Name */}
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="border px-4 py-2 rounded-md w-full"
              value={modalUser.name}
              onChange={(e) =>
                setModalUser({ ...modalUser, name: e.target.value })
              }
            />

            {/* Email */}
            <label className="block mt-4 mb-2">Email</label>
            <input
              type="email"
              className="border px-4 py-2 rounded-md w-full"
              value={modalUser.email}
              onChange={(e) =>
                setModalUser({ ...modalUser, email: e.target.value })
              }
            />

            {/* Date of Birth */}
            <label className="block mt-4 mb-2">Date of Birth</label>
            <input
              type="date"
              className="border px-4 py-2 rounded-md w-full"
              value={modalUser.dateOfBirth}
              onChange={(e) =>
                setModalUser({ ...modalUser, dateOfBirth: e.target.value })
              }
            />

            {/* Role (Dropdown) */}
            <label className="block mt-4 mb-2">Role</label>
            <select
              className="border px-4 py-2 rounded-md w-full"
              value={modalUser.isAdmin}
              onChange={(e) =>
                setModalUser({
                  ...modalUser,
                  isAdmin: parseInt(e.target.value),
                })
              }
            >
              <option value={0}>Admin</option>
              <option value={1}>User</option>
            </select>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
