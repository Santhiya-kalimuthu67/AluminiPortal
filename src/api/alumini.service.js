import api from "./api.axios.js";


export const fetchAluminiRecords = async (params) => {
  const res = await api.get("/alumni", {
    params
  });
  return res.data;
};

export const sendMentorReq = async (params) => {
  const res = await api.post("/mentorship", 
    params
  );
  return res.data;
};
 export const fetchIncomingRequests = async () => {
    const res = await api.get("/mentorship/incoming");
    return res?.data
  };

  // Update mentorship status
export const updateMentorshipStatus = async (id, status) => {
  try {
    const response = await api.patch(
      `/mentorship/${id}`,
      { status }   
    );

    return response.data;

  } catch (error) {
    throw error.response?.data || error;
  }
};


  export const fetchAllStudent = async (params) => {
  const res = await api.get("/alumni/viewStudents", { params });
  return res.data;
};

