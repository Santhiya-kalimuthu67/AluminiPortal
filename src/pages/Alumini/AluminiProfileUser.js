import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProfileViewCard from "../ProfileViewCard";
import StudentProfileForm from "../StudentProfileForm";
import { getMyProfile } from "../../api/profile.service";
import { useProfileStore } from "../../store/profileStore";
import AluminiViewCard from "./AluminiViewCard";
import AlumniProfile from "../AluminiProfile";

export default function AluminiProfileUser() {
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
    <Box sx={{ maxWidth: 800, mx: "auto", py: 6 }}>
      {isEditing ? (
        <AlumniProfile
          profile={profile}
          isEdit={isEditing}
          onSaved={(savedProfile) => {
            setProfile(savedProfile); // ✅ fixed
            setEditMode(false);
          }}
       
        />
      ) : (
        <AluminiViewCard
          profile={profile}
          onEdit={() => setEditMode(true)}
        />
      )}
    </Box>
  );
}