import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

export const applyJob = async (req, res) => {
  try {
    const studentId = req.user.id; // from auth middleware
    const { jobId } = req.params;
    const { resume, coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not available" });
    }

    const application = await JobApplication.create({
      job: jobId,
      student: studentId,
      resume,
      coverLetter,
    });

    return res.status(201).json(application);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job" });
    }

    return res.status(500).json({ message: "Application failed" });
  }
};
export const getJobApplicants = async (req, res) => {
  try {
    const applications = await JobApplication.find({
      job: req.params.jobId,
    })
      .populate("student", "name email profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
};

export const getStudentApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({
      student: req.params.id,
    })
      .populate("job", "title company type")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};


