import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

interface User {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  isAdmin: number;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); // ✅ Thêm trạng thái trang
  const [totalPages, setTotalPages] = useState(1); // ✅ Tổng số trang
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/admin/users?page=${page}&per_page=10&search=${search}`
      );
      setUsers(response.data.users);
      setTotalPages(response.data.total_pages || 1); // Lưu tổng số trang từ API
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">Admin Dashboard</h2>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="🔍 Search user..."
          className="border px-4 py-2 rounded-md w-1/3 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Phân trang */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-3 py-1 border rounded-md ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-3 py-1 border rounded-md ${
              page === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination buttons */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-3 py-1 border rounded-md ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-3 py-1 border rounded-md ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
