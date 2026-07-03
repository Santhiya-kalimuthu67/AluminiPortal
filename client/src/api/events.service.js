import api from "./api.axios.js";


export const fetchEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

export const registerEvents = async (payload) => {
  const res = await api.post("/events/register",payload);
  return res.data;
};
