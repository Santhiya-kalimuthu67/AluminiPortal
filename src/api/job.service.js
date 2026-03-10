import api from "./api.axios.js";


export const getjobs = async () => {
  const { data } = await api.get("/job/find-job");
  return data;
};

export const getJobById = async (id) => {
  const { data } = await api.get(`/job/${id}`);
  return data;
};

export const applyJob = async ({ jobId, studentId, resume, coverLetter }) => {
  const res = await api.post(
    `/applications/apply/${jobId}`,
    { studentId, resume, coverLetter }
  );
  return res.data;
};
