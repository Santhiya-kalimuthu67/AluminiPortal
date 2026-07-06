import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import StudentProfile from "../models/StudentProfile.js";

export const applyJob = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { jobId } = req.params;
    const { coverLetter } = req.body;

    const job = await Job.findById(jobId);

    if (!job || !job.isActive) {
      return res.status(404).json({
        message: "Job not available",
      });
    }

    const studentProfile = await StudentProfile.findOne({
      userId: studentId,
    });

    if (!studentProfile) {
      return res.status(400).json({
        message: "Complete your student profile before applying",
      });
    }

    if (!studentProfile.resume) {
      return res.status(400).json({
        message: "Upload your resume before applying",
      });
    }

    const application = await JobApplication.create({
      job: jobId,
      student: studentId,
      resume: studentProfile.resume,
      coverLetter,
    });

    return res.status(201).json(application);
  } catch (error) {
    console.error("Job application failed:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already applied to this job",
      });
    }

    return res.status(500).json({
      message: "Application failed",
    });
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


