import { apiUrl } from "../config/apiendpints"
import api from "./api.axios.js";



export const fetchStudentDashboard = async () => {
  const res = await api.get("/dashboard/student");
  return res.data;
};

export const fetchAluminiDashboard = async () => {
  const res = await api.get("/dashboard/alumini");
  return res.data;
};
