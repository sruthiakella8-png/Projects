import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Prevent multiple simultaneous refresh requests.
let isRefreshing = false;
let refreshSubscribers = [];

// Notify requests waiting for the refresh.
const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => {
    callback(newAccessToken);
  });

  refreshSubscribers = [];
};

// Add a request to the waiting queue.
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};


// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

api.interceptors.request.use(
  (config) => {

    const publicEndpoints = [
      "/auth/token/",
      "/auth/token/refresh/",
      "/register/",
      "/auth/register/",
      "/login/",
      "/forgot-password/",
      "/reset-password/",
    ];

    const isPublicEndpoint = publicEndpoints.some(
      (endpoint) => config.url?.startsWith(endpoint)
    );

    if (!isPublicEndpoint) {
      const accessToken =
        localStorage.getItem("access_token");

      if (accessToken) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

api.interceptors.response.use(

  // Normal successful response
  (response) => {
    return response;
  },

  async (error) => {

    const originalRequest = error.config;

    // No response from server
    if (!error.response) {
      return Promise.reject(error);
    }

    // Only handle 401 responses.
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Never try to refresh the refresh request itself.
    if (
      originalRequest.url?.includes(
        "/auth/token/refresh/"
      )
    ) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      localStorage.removeItem("login_user");
      localStorage.removeItem("username");
      localStorage.removeItem("email");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    // Prevent infinite retry loops.
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken =
      localStorage.getItem("refresh_token");

    // No refresh token → user must log in again.
    if (!refreshToken) {

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      localStorage.removeItem("login_user");
      localStorage.removeItem("username");
      localStorage.removeItem("email");

      window.location.href = "/login";

      return Promise.reject(error);
    }


    // ========================================================
    // If another request is already refreshing the token,
    // wait for that refresh instead of sending another one.
    // ========================================================

    if (isRefreshing) {

      return new Promise((resolve) => {

        addRefreshSubscriber((newAccessToken) => {

          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

          resolve(api(originalRequest));
        });

      });
    }


    // ========================================================
    // Start refresh
    // ========================================================

    isRefreshing = true;

    try {

      const refreshResponse = await axios.post(
        "http://127.0.0.1:8000/api/auth/token/refresh/",
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken =
        refreshResponse.data.access;

      const newRefreshToken =
        refreshResponse.data.refresh;


      if (!newAccessToken) {
        throw new Error(
          "Refresh endpoint did not return an access token."
        );
      }


      // ======================================================
      // Store new access token
      // ======================================================

      localStorage.setItem(
        "access_token",
        newAccessToken
      );


      // ======================================================
      // Because ROTATE_REFRESH_TOKENS = True,
      // Django may also return a new refresh token.
      // ======================================================

      if (newRefreshToken) {

        localStorage.setItem(
          "refresh_token",
          newRefreshToken
        );
      }


      // Wake up requests waiting for the refresh.
      onRefreshed(newAccessToken);


      // Retry original request.
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);

    } catch (refreshError) {

      console.error(
        "JWT refresh failed:",
        refreshError
      );

      refreshSubscribers = [];

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      localStorage.removeItem("login_user");
      localStorage.removeItem("username");
      localStorage.removeItem("email");

      window.location.href = "/login";

      return Promise.reject(refreshError);

    } finally {

      isRefreshing = false;
    }
  }
);


export default api;