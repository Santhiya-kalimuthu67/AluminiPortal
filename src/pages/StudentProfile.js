import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getMyProfile } from "../api/profile.service";
import ProfileViewCard from "../pages/ProfileViewCard";
import StudentProfileForm from "../pages/StudentProfileForm";
import { useProfileStore } from "../store/profileStore";

export default function StudentProfile() {
  const [editMode, setEditMode] = useState(false);

  // ✅ correct Zustand usage
  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyProfile();
        if (res) setProfile(res);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }; 

    load();
  }, [setProfile]);

  const isEditing = !profile || editMode;

  return (

  <Box
 sx={{maxWidth:1100}}
  >
    {isEditing ? (
      <StudentProfileForm
        profile={profile}
        onSaved={(savedProfile) => {
          setProfile(savedProfile);
          setEditMode(false);
        }}
      />
    ) : (
      <ProfileViewCard
        profile={profile}
        onEdit={() => setEditMode(true)}
      />
    )}
  </Box>

  );
}
