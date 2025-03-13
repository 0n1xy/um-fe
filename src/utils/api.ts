import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_DEV; // Lấy từ biến môi trường

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Thêm Interceptor để tự động thêm Access Token vào Header
api.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (refreshToken) {
      // Nếu không có access_token, nhưng có refresh_token → Thử cấp lại access_token
      try {
        const response = await axios.post(`${API_URL}/refresh-token`, {
          refresh_token: refreshToken,
        });

        accessToken = response.data.access_token;
        localStorage.setItem("access_token", accessToken);

        config.headers.Authorization = `Bearer ${accessToken}`;
      } catch (error) {
        console.error("Refresh token invalid or expired", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Thêm Interceptor để xử lý response khi Access Token hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(`${API_URL}/refresh-token`, {
            refresh_token: refreshToken,
          });

          const newAccessToken = response.data.access_token;
          localStorage.setItem("access_token", newAccessToken);

          // Gửi lại request với Access Token mới
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (error) {
          console.error("Refresh token expired. Please log in again.");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
