import axios from "axios";
import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:3001/";

export const LoginUser = async (credentials) => {
  const data = await axios.post(API_URL + "login/", credentials);
  console.log(data);
  return data;
};

export const getUser = async (userID) => {
    const response = await axiosInstance.get(`${API_URL}users/${userID}`);
    if (response.status === 200) {
      return await response.data;
    }
  };