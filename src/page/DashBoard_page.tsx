import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import api from "../utils/api";

interface User {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  isAdmin: number;
  password: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/admin/users?per_page=10&search=${search}`
      );
      setUsers(response.data.users);
    } catch (err) {
      console.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
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

  const handleUpdate = async () => {
    if (!currentUser) return;
    try {
      await api.put(`/admin/users/${currentUser.id}`, currentUser);
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Admin Dashboard</h2>
      <input
        type="text"
        placeholder="🔍 Search user..."
        className="border px-4 py-2 rounded-md w-1/3 shadow-sm mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full table-auto border-collapse bg-white shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Date of Birth</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
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
                  {user.isAdmin === 0 ? "Admin" : "User"}
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                    onClick={() => {
                      setCurrentUser(user);
                      setIsModalOpen(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update Modal */}
      {isModalOpen && currentUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h3 className="text-xl font-bold mb-4">Update User</h3>
            <input
              type="text"
              value={currentUser.name}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="email"
              value={currentUser.email}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="date"
              value={currentUser.dateOfBirth}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, dateOfBirth: e.target.value })
              }
              className="w-full border p-2 rounded mb-2"
            />
            <select
              value={currentUser.isAdmin}
              onChange={(e) =>
                setCurrentUser({
                  ...currentUser,
                  isAdmin: Number(e.target.value),
                })
              }
              className="w-full border p-2 rounded mb-4"
            >
              <option value={0}>Admin</option>
              <option value={1}>User</option>
            </select>
            <input
              type="password"
              value={currentUser.password}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, password: e.target.value })
              }
              className="w-full border p-2 rounded mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
