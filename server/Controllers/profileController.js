import StudentProfile from "../models/StudentProfile.js";
import AlumniProfile from "../models/AluminiProfile.js";


export const upsertStudentProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user.id },
      {
        ...req.body,
        skills: req.body.skills?.split(",").map(s => s.trim()),
        profilePhoto: req.files?.profilePic?.[0]?.path,
        resume: req.files?.resume?.[0]?.path
      },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch {
    res.status(500).json({ message: "Student profile save failed" });
  }
};

export const upsertAlumniProfile = async (req, res) => {
  try {
    const {
      skills,
      bio,
      ...rest
    } = req.body;

    const profile = await AlumniProfile.findOneAndUpdate(
      { userId: req.user.id },
      {
        ...rest,

        skills: skills
          ? skills.split(",").map(s => s.trim())
          : [],

        bio: bio ? bio.trim().substring(0, 500) : undefined,

        ...(req.file && { profilePhoto: req.file.path })
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.json(profile);

  } catch (error) {
    res.status(500).json({
      message: "Alumni profile save failed"
    });
  }
};


export const getMyProfile = async (req, res) => {
  try {
    let profile;

    if (req.user.role === "student") {
      profile = await StudentProfile.findOne({ userId: req.user.id });
    }

    if (req.user.role === "alumni") {
      profile = await AlumniProfile.findOne({ userId: req.user.id });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Profile fetch failed" });
  }
};
