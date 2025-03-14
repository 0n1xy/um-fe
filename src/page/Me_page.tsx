import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { IUser, IUserUpdate } from "../types/User_Interface";

const Me: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await api.get("/auth/me");
      const userData = response.data;

      setUser(userData);

      // Initialize form fields
      setName(userData.name || "");
      setEmail(userData.email || "");
      setDateOfBirth(
        userData.dateOfBirth
          ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
          : ""
      );

      setError("");
    } catch (err) {
      setError("Failed to load user information");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const validateForm = () => {
    setSaveError("");

    if (password && password.length < 6) {
      setSaveError("Password must be at least 6 characters long");
      return false;
    }

    if (password && password !== confirmPassword) {
      setSaveError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!user || !validateForm()) return;

    try {
      setSaveLoading(true);
      setSaveError("");
      setSuccessMessage("");

      const updateData: IUserUpdate = {};

      // Only include fields that have changed
      if (name !== user.name) updateData.name = name;
      if (email !== user.email) updateData.email = email;
      if (
        dateOfBirth !== new Date(user.dateOfBirth).toISOString().split("T")[0]
      ) {
        updateData.dateOfBirth = dateOfBirth;
      }
      if (password) updateData.password = password;

      // Don't send request if nothing changed
      if (Object.keys(updateData).length === 0) {
        setIsEditing(false);
        return;
      }

      // Call the update endpoint
      await api.put(`/auth/me`, updateData);

      // Refresh user data
      await fetchUserInfo();

      // Reset password fields
      setPassword("");
      setConfirmPassword("");

      setSuccessMessage("Profile updated successfully");
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setSaveError("Failed to save changes. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to current user data
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setDateOfBirth(
        user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : ""
      );
    }

    // Clear password fields
    setPassword("");
    setConfirmPassword("");

    setSaveError("");
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-bold mt-2">Error</h2>
          </div>
          <p>{error}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
            onClick={fetchUserInfo}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <p className="text-gray-600">No user data found.</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 max-w-full">
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg flex justify-between items-center">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage("")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        {!isEditing ? (
          // View Mode
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <span className="text-blue-600 text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
                <span className="text-gray-600">ID</span>
                <span className="font-medium">{user.id}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
                <span className="text-gray-600">Date of Birth</span>
                <span className="font-medium">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
                <span className="text-gray-600">Role</span>
                <span
                  className={`px-3 py-1 text-white text-sm font-medium rounded-full ${
                    user.isAdmin === 0 ? "bg-green-500" : "bg-blue-500"
                  }`}
                >
                  {user.isAdmin === 0 ? "Admin" : "User"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-200"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>

              <button
                className="border border-red-500 text-red-500 hover:bg-red-50 py-2 rounded-lg transition duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          // Edit Mode
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCancel}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {saveError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
                {saveError}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  New Password (optional)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">ID</span>
                <span className="font-medium">{user.id}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Role</span>
                <span
                  className={`px-3 py-1 text-white text-sm font-medium rounded-full ${
                    user.isAdmin === 0 ? "bg-green-500" : "bg-blue-500"
                  }`}
                >
                  {user.isAdmin === 0 ? "Admin" : "User"}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-200 flex items-center justify-center"
                onClick={handleSave}
                disabled={saveLoading}
              >
                {saveLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Save Changes"
                )}
              </button>

              <button
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-lg transition duration-200"
                onClick={handleCancel}
                disabled={saveLoading}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Me;
