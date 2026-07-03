import api from "./api.axios.js";

export const fetchUserDetails = async () => {
  const { data } = await api.get("/admin/pending");
  return data;
};

export const approveUser = async (id) => {
  const { data } = await api.put(`/admin/approve/${id}`);
  return data;
};

