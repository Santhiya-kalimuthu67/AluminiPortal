import express from "express";
import AlumniProfile from "../models/AluminiProfile.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";
import { roleGuard } from "../middleware/roleGuard.js";
import StudentProfile from "../models/StudentProfile.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const { skill, company, name, available, page = 1, limit = 6 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // ---------------------------
    // Build AlumniProfile filter
    // ---------------------------
    let profileMatch = {};

    if (skill) {
      profileMatch.skills = {
        $elemMatch: { $regex: skill, $options: "i" },
      };
    }

    if (company) {
      profileMatch.company = {
        $regex: company,
        $options: "i",
      };
    }

    if (available === "true") {
      profileMatch.availableForMentorship = true;
    }

    // ---------------------------
    // Aggregation Pipeline
    // ---------------------------
    const pipeline = [
      {
        $match: profileMatch,
      },
      {
        $lookup: {
          from: "users", // collection name (lowercase plural)
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: {
          "user.role": "alumni",
          "user.status": "approved",
          ...(name && {
            "user.name": { $regex: name, $options: "i" },
          }),
        },
      },
      {
        $project: {
          _id: 1,
          education: 1,
          department: 1,
          graduationYear: 1,
          company: 1,
          designation: 1,
          skills: 1,
          experience: 1,
          bio: 1,
          availableForMentorship: 1,
          linkedin: 1,
          github: 1,
          profilePhoto: 1,
          createdAt: 1,
          "user._id": 1,
          "user.name": 1,
          "user.email": 1,
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limitNumber }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await AlumniProfile.aggregate(pipeline);

    const data = result[0].data;
    const total = result[0].totalCount[0]?.count || 0;

    res.json({
      data,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});




/*
  GET /api/students
  Alumni can view all students
*/
router.get("/viewStudents", auth, roleGuard("alumni"), async (req, res) => {
  try {
    const {
      skill,
      department,
      year,
      name,
      page = 1,
      limit = 6
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // -------------------------
    // StudentProfile Filters
    // -------------------------
    let profileMatch = {};

    if (skill) {
      profileMatch.skills = {
        $elemMatch: { $regex: skill, $options: "i" }
      };
    }

    if (department) {
      profileMatch.department = {
        $regex: department,
        $options: "i"
      };
    }

    if (year) {
      profileMatch.year = {
        $regex: year,
        $options: "i"
      };
    }

    // -------------------------
    // Aggregation Pipeline
    // -------------------------
    const pipeline = [
      {
        $match: profileMatch
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $match: {
          "user.role": "student",
          ...(name && {
            "user.name": { $regex: name, $options: "i" }
          })
        }
      },
      {
        $project: {
          _id: 1,
          department: 1,
          year: 1,
          interests: 1,
          skills: 1,
          profilePhoto: 1,
          resume: 1,
          createdAt: 1,
          "user._id": 1,
          "user.name": 1,
          "user.email": 1
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limitNumber }],
          totalCount: [{ $count: "count" }]
        }
      }
    ];

    const result = await StudentProfile.aggregate(pipeline);

    const data = result[0].data;
    const total = result[0].totalCount[0]?.count || 0;

    res.json({
      data,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber)
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/applicants", auth, roleGuard("alumni"), async (req, res) => {
  try {
    const alumniId = new mongoose.Types.ObjectId(req.user.id);

    // 1️⃣ Get jobs posted by this alumni
    const jobs = await Job.find({ postedBy: alumniId }).select("_id");

    const jobIds = jobs.map(job => job._id);

    if (jobIds.length === 0) {
      return res.json([]); // no jobs → no applicants
    }

    // 2️⃣ Get applications for those jobs
    const applications = await JobApplication.find({
      job: { $in: jobIds }
    })
      .populate("job", "title company")
      .populate("student", "name email profilePhoto")
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (err) {
    console.error("Applicants Fetch Error:", err);
    res.status(500).json({ message: err.message });
  }
});



export default router;
