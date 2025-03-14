import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  isAdmin: number;
  password?: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const perPage = 10;
  const navigate = useNavigate();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [search, currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/admin/users?per_page=${perPage}&page=${currentPage}&search=${search}`
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setMessage("✅ User registered successfully!");

      setName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error("Registration error:", err.response?.data);
      setMessage(err.response?.data?.message || "❌ Registration failed.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleUpdate = async () => {
    if (!currentUser) return;

    const updateData: User = {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      dateOfBirth: currentUser.dateOfBirth,
      isAdmin: currentUser.isAdmin,
      password: currentUser.password,
    };

    if (currentUser.password && currentUser.password.length > 0) {
      updateData.password = currentUser.password;
    }

    try {
      await api.put(`/admin/users/${currentUser.id}`, updateData);
      setIsUpdateModalOpen(false);
      fetchUsers();
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">Admin Dashboard</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsRegisterModalOpen(true)}
        >
          Register
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <table className="w-full table-auto border-collapse bg-white shadow-lg">
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
                    {user.isAdmin === 0 ? "Admin" : "User"}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                      onClick={() => {
                        setCurrentUser(user);
                        setIsUpdateModalOpen(true);
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

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              className={`px-4 py-2 bg-gray-300 rounded-md ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-white border rounded-md">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 bg-gray-300 rounded-md ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && currentUser && (
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
            <input
              type="password"
              value={currentUser.password}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, password: e.target.value })
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
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 px-4 py-2 rounded-md"
                onClick={() => setIsUpdateModalOpen(false)}
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

      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h3 className="text-xl font-bold mb-4">Register User</h3>
            {message && <p className="text-red-500">{message}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-400 px-4 py-2 rounded-md"
                  onClick={() => setIsRegisterModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
