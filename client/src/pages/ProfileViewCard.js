// import {
//   Box,
//   Avatar,
//   Typography,
//   Stack,
//   Chip,
//   Button,
//   Divider
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DescriptionIcon from "@mui/icons-material/Description";
// import { motion } from "framer-motion";

// const MotionBox = motion(Box);

// const API_BASE_URL = "http://localhost:5000";

// export default function ProfileViewCard({ profile, onEdit }) {

//   const profileImage = profile.profilePhoto
//     ? `${API_BASE_URL}/${profile.profilePhoto.replace(/\\/g, "/")}`
//     : "";

//   const resumeUrl = profile.resume
//     ? `${API_BASE_URL}/${profile.resume.replace(/\\/g, "/")}`
//     : "";

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background:
//           "linear-gradient(135deg,#0f172a,#1e293b)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         p: 3
//       }}
//     >
//       <MotionBox
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         sx={{
//           width: "100%",
//           maxWidth: 800,
//           p: 4,
//           borderRadius: 4,
//           background: "rgba(255,255,255,0.08)",
//           backdropFilter: "blur(18px)",
//           boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
//           color: "white"
//         }}
//       >
//         {/* Header */}
//         <Stack direction="row" spacing={3} alignItems="center">
//           <motion.div whileHover={{ scale: 1.1 }}>
//             <Avatar
//               src={profileImage}
//               sx={{
//                 width: 110,
//                 height: 110,
//                 fontSize: 32,
//                 fontWeight: 600,
//                 background:
//                   "linear-gradient(135deg,#6366F1,#8B5CF6)"
//               }}
//             >
//               {!profileImage &&
//                 profile.name?.charAt(0)?.toUpperCase()}
//             </Avatar>
//           </motion.div>

//           <Box>
//             <Typography variant="h4" fontWeight={700}>
//               {profile.name || "Student"}
//             </Typography>
//             <Typography sx={{ opacity: 0.7 }}>
//               {profile.department} • {profile.year}
//             </Typography>
//           </Box>
//         </Stack>

//         <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

//         {/* Skills */}
//         {Array.isArray(profile.skills) &&
//           profile.skills.length > 0 && (
//             <>
//               <Typography fontWeight={600} mb={2}>
//                 Skills
//               </Typography>

//               <Stack direction="row" spacing={1} flexWrap="wrap">
//                 {profile.skills.map((skill, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: i * 0.05 }}
//                   >
//                     <Chip
//                       label={skill}
//                       sx={{
//                         background:
//                           "linear-gradient(90deg,#6366F1,#8B5CF6)",
//                         color: "white"
//                       }}
//                     />
//                   </motion.div>
//                 ))}
//               </Stack>
//             </>
//           )}

//         {/* Interests */}
//         {profile.interests && (
//           <Box mt={4}>
//             <Typography fontWeight={600}>
//               Interests
//             </Typography>
//             <Typography sx={{ opacity: 0.8 }}>
//               {profile.interests}
//             </Typography>
//           </Box>
//         )}

//         {/* Resume + Edit */}
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           mt={5}
//         >
//           {resumeUrl && (
//             <Button
//               variant="outlined"
//               startIcon={<DescriptionIcon />}
//               href={resumeUrl}
//               target="_blank"
//               sx={{
//                 borderColor: "#6366F1",
//                 color: "#6366F1",
//                 "&:hover": {
//                   borderColor: "#8B5CF6",
//                   color: "#8B5CF6"
//                 }
//               }}
//             >
//               View Resume
//             </Button>
//           )}

//           <motion.div whileHover={{ scale: 1.05 }}>
//             <Button
//               variant="contained"
//               startIcon={<EditIcon />}
//               onClick={onEdit}
//               sx={{
//                 background:
//                   "linear-gradient(90deg,#6366F1,#8B5CF6)",
//                 borderRadius: 3,
//                 fontWeight: 600
//               }}
//             >
//               Edit Profile
//             </Button>
//           </motion.div>
//         </Stack>
//       </MotionBox>
//     </Box>
//   );
// }


import {
  Box,
  Avatar,
  Typography,
  Stack,
  Chip,
  Button,
  Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const API_BASE_URL = "http://localhost:5000";

export default function ProfileViewCard({ profile, onEdit }) {

  const profileImage = profile.profilePhoto
    ? `${API_BASE_URL}/${profile.profilePhoto.replace(/\\/g, "/")}`
    : "";

  const resumeUrl = profile.resume
    ? `${API_BASE_URL}/${profile.resume.replace(/\\/g, "/")}`
    : "";

  return (
    <Box
      sx={{
      
        width: "100%",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        px: { xs: 2, md: 6 },
        py: 5
      }}
    >
      <MotionBox
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          width: "100%",
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          color: "white"
        }}
      >
        {/* Header */}
        <Stack direction="row" spacing={3} alignItems="center">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Avatar
              src={profileImage}
              sx={{
                width: 110,
                height: 110,
                fontSize: 32,
                fontWeight: 600,
                background: "linear-gradient(135deg,#6366F1,#8B5CF6)"
              }}
            >
              {!profileImage &&
                profile.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </motion.div>

          <Box>
            <Typography variant="h4" fontWeight={700}>
              {profile.name || "Student"}
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>
              {profile.department} • {profile.year}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Skills */}
        {Array.isArray(profile.skills) &&
          profile.skills.length > 0 && (
            <>
              <Typography fontWeight={600} mb={2}>
                Skills
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {profile.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Chip
                      label={skill}
                      sx={{
                        background:
                          "linear-gradient(90deg,#6366F1,#8B5CF6)",
                        color: "white"
                      }}
                    />
                  </motion.div>
                ))}
              </Stack>
            </>
          )}

        {/* Interests */}
        {profile.interests && (
          <Box mt={4}>
            <Typography fontWeight={600}>
              Interests
            </Typography>
            <Typography sx={{ opacity: 0.8 }}>
              {profile.interests}
            </Typography>
          </Box>
        )}

        {/* Resume + Edit */}
        <Stack
          direction="row"
          justifyContent="space-between"
          mt={5}
        >
          {resumeUrl && (
            <Button
              variant="outlined"
              startIcon={<DescriptionIcon />}
              href={resumeUrl}
              target="_blank"
              sx={{
                borderColor: "#6366F1",
                color: "#6366F1",
                "&:hover": {
                  borderColor: "#8B5CF6",
                  color: "#8B5CF6"
                }
              }}
            >
              View Resume
            </Button>
          )}

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={onEdit}
              sx={{
                background:
                  "linear-gradient(90deg,#6366F1,#8B5CF6)",
                borderRadius: 3,
                fontWeight: 600
              }}
            >
              Edit Profile
            </Button>
          </motion.div>
        </Stack>
      </MotionBox>
    </Box>
  );
}