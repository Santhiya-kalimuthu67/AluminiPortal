import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProfileViewCard from "../ProfileViewCard";
import StudentProfileForm from "../StudentProfileForm";
import { getMyProfile } from "../../api/profile.service";
import { useProfileStore } from "../../store/profileStore";
import AluminiViewCard from "../Alumini/AluminiViewCard";
import AlumniProfile from "../AluminiProfile";
import AdminProfileForm from "./AdminProfileForm";


export default function AdminProfileUser() {
  const [editMode, setEditMode] = useState(false);

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
        <AdminProfileForm
        isAdmin={true}
          profile={profile}
          isEdit={isEditing}
          onSaved={(savedProfile) => {
            setProfile(savedProfile); // ✅ fixed
            setEditMode(false);
          }}
       
        />
      ) : (
        <AdminViewCard
        isAdmin={true}
          profile={profile}
          onEdit={() => setEditMode(true)}
        />
      )}
    </Box>
  );
}