import { apiUrl } from "../config/apiendpints"
import api from "./api.axios.js";



export const register = (payload) =>
  api.post("/auth/register", payload);

export const login = (payload) =>
  api.post("/auth/login", payload);

export const forgotPassword = (data) =>
  api.post("/auth/forgot-password", data);

export const resetPassword = (token, data) =>
  api.put(`/auth/reset-password/${token}`, data);