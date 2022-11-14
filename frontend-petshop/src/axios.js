import axios from "axios";
//import jwt from "jwt-decode"

const API_URL = "http://127.0.0.1:3001/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("token")
      ? "JWT " + localStorage.getItem("token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
        window.location.href = "/login/";
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;