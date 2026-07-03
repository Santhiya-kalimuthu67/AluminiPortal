
import api from "./api.axios.js";


export const getMyProfile = async () => {
  const { data } = await api.get("/profile/me");
  return data;
};

export const saveStudentProfile = async (formData) => {
  return api.post("/profile/student", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const saveAlumniProfile = async (formData) => {
  return api.post("/profile/alumni", formData, {
    headers: { "Content-Type" : "multipart/form-data" }
  });
};

