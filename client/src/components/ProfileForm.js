// import { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Avatar,
//   Divider,
//   FormControlLabel,
//   Switch
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// const API_BASE_URL = "http://localhost:5000";

// export default function ProfileForm({
//   fields,
//   onSubmit,
//   initialData = {},
//   showResume = false,
//   showToggle = false
// }) {

  
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [resume, setResume] = useState(null);
// const [form, setForm] = useState(initialData || {});

//  const handleChange = (e) => {
//   const { name, value } = e.target;
//   setForm((prev) => ({
//     ...prev,
//     [name]: value
//   }));
// };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onSubmit({
//       ...form,
//       profilePhoto,  // ✅ correct key
//       resume
//     });
//   };

//   // ✅ Show existing image OR newly selected file
//   const previewImage = profilePhoto
//     ? URL.createObjectURL(profilePhoto)
//     : form.profilePhoto
//     ? `${API_BASE_URL}/${form.profilePhoto.replace(/\\/g, "/")}`
//     : "";

// return (
//   <Box
//     sx={{
//       minHeight: "100vh",
//       // width: "100%",
//       // px: { xs: 2, md: 8 },
//       // py: { xs: 4, md: 6 },
     
//     }}
//   >
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         width: "100%",
//         borderRadius: 4,
//         p: { xs: 3, md: 6 },
//         backdropFilter: "blur(14px)",
//         background: "rgba(255,255,255,0.75)",
//         border: "1px solid rgba(255,255,255,0.6)",
//         boxShadow: "0 30px 90px rgba(0,0,0,0.10)"
//       }}
//     >
//       {/* HEADER */}
//       <Box mb={6}>
//         <Typography
//           variant="h3"
//           fontWeight={900}
//           sx={{
//             background:
//               "linear-gradient(90deg,#6366f1,#7c3aed,#ec4899)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             letterSpacing: "-0.5px"
//           }}
//         >
//           Complete your profile
//         </Typography>

//         <Typography
//           color="text.secondary"
//           mt={1}
//           sx={{ fontSize: 16 }}
//         >
//           Build your professional identity and unlock new
//           opportunities.
//         </Typography>
//       </Box>

//       {/* PROFILE SECTION */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 4,
//           mb: 7,
//           p: 3,
//           borderRadius: 3,
//           background:
//             "linear-gradient(135deg,#ffffff,#f9fafb)",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
//         }}
//       >
//         <Avatar
//           src={previewImage}
//           sx={{
//             width: 110,
//             height: 110,
//             border: "4px solid white",
//             boxShadow:
//               "0 20px 45px rgba(124,58,237,0.35)"
//           }}
//         />

//         <Box>
//           <Button
//             component="label"
//             variant="contained"
//             startIcon={<CloudUploadIcon />}
//             sx={{
//               textTransform: "none",
//               fontWeight: 700,
//               borderRadius: 2,
//               px: 3,
//               background:
//                 "linear-gradient(90deg,#6366f1,#7c3aed)",
//               boxShadow:
//                 "0 10px 30px rgba(99,102,241,0.4)"
//             }}
//           >
//             Upload Photo
//             <input
//               hidden
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setProfilePhoto(e.target.files[0])
//               }
//             />
//           </Button>

//           <Typography
//             variant="caption"
//             color="text.secondary"
//             display="block"
//             mt={1}
//           >
//             JPG or PNG · Max 2MB
//           </Typography>
//         </Box>
//       </Box>

//       {/* FORM GRID */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: {
//             xs: "1fr",
//             md: "1fr 1fr",
//             lg: "1fr 1fr 1fr"
//           },
//           gap: 3
//         }}
//       >
//         {fields.map((field) => {
//           if (field.type === "switch") {
//             return (
//               <Box
//                 key={field.name}
//                 sx={{
//                   gridColumn: field.fullWidth
//                     ? "1 / -1"
//                     : "auto",
//                   p: 2.5,
//                   borderRadius: 2,
//                   background:
//                     "linear-gradient(135deg,#f9fafb,#ffffff)",
//                   border: "1px solid #eee"
//                 }}
//               >
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={form[field.name] || false}
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           [field.name]:
//                             e.target.checked
//                         })
//                       }
//                     />
//                   }
//                   label={field.label}
//                 />
//               </Box>
//             );
//           }

//           return (
//             <TextField
//               key={field.name}
//               label={field.label}
//               name={field.name}
//               value={form[field.name] || ""}
//               onChange={handleChange}
//               multiline={field.multiline}
//               minRows={field.multiline ? 3 : 1}
//               required={field.required}
//               fullWidth
//               sx={{
//                 gridColumn: field.fullWidth
//                   ? "1 / -1"
//                   : "auto",

//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 2,
//                   backgroundColor: "#fff",
//                   transition: "all .25s",

//                   "&:hover": {
//                     boxShadow:
//                       "0 8px 22px rgba(0,0,0,0.08)"
//                   },

//                   "&.Mui-focused": {
//                     boxShadow:
//                       "0 10px 28px rgba(124,58,237,0.25)"
//                   }
//                 }
//               }}
//             />
//           );
//         })}
//       </Box>

//       {/* RESUME */}
//       {showResume && (
//         <Box mt={7}>
//           <Button
//             component="label"
//             variant="outlined"
//             startIcon={<CloudUploadIcon />}
//             sx={{
//               borderRadius: 2,
//               textTransform: "none",
//               fontWeight: 600,
//               borderWidth: 2
//             }}
//           >
//             Upload Resume
//             <input
//               hidden
//               type="file"
//               accept=".pdf,.doc,.docx"
//               onChange={(e) =>
//                 setResume(e.target.files[0])
//               }
//             />
//           </Button>

//           {resume && (
//             <Typography mt={2}>
//               📄 {resume.name}
//             </Typography>
//           )}
//         </Box>
//       )}

//       {/* SUBMIT */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           mt: 8
//         }}
//       >
//         <Button
//           type="submit"
//           size="large"
//           variant="contained"
//           sx={{
//             px: 7,
//             py: 1.8,
//             fontSize: 16,
//             fontWeight: 800,
//             borderRadius: 3,
//             textTransform: "none",
//             background:
//               "linear-gradient(90deg,#6366f1,#7c3aed,#ec4899)",
//             boxShadow:
//               "0 15px 40px rgba(124,58,237,0.4)"
//           }}
//         >
//           Save Profile
//         </Button>
//       </Box>
//     </Box>
//   </Box>
// );
// }


import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Switch,
  FormControlLabel
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const API_BASE_URL = "http://localhost:5000";

export default function ProfileForm({
  fields,
  onSubmit,
  initialData = {},
  showResume = false
}) {

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [form, setForm] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      profilePhoto
    });
  };

  const previewImage = profilePhoto
    ? URL.createObjectURL(profilePhoto)
    : form.profilePhoto
    ? `${API_BASE_URL}/${form.profilePhoto.replace(/\\/g, "/")}`
    : "";

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        borderRadius: 4,
        p: 5,
        background:
          "linear-gradient(145deg,#0f172a,#111827)",
        color: "white"
      }}
    >
      {/* TITLE */}
      <Typography variant="h4" fontWeight={700} mb={1}>
        Complete your profile
      </Typography>

      <Typography
        sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}
      >
        Build your professional identity and unlock new
        opportunities.
      </Typography>

      {/* PHOTO UPLOAD */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          p: 2,
          borderRadius: 3,
          mb: 4,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <Avatar
          src={previewImage}
          sx={{
            width: 60,
            height: 60,
            bgcolor: "#1f2937"
          }}
        />

        <Button
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{
            background:
              "linear-gradient(90deg,#6366f1,#ec4899)",
            color: "#fff",
            px: 3,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600
          }}
        >
          Upload Photo
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProfilePhoto(e.target.files[0])
            }
          />
        </Button>

        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.5)" }}
        >
          JPG, PNG · Max 2MB
        </Typography>
      </Box>

      {/* FORM GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr"
          },
          gap: 3
        }}
      >
        {fields.map((field) => {
          if (field.type === "switch") {
            return (
              <FormControlLabel
                key={field.name}
                control={
                  <Switch
                    checked={form[field.name] || false}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [field.name]:
                          e.target.checked
                      })
                    }
                  />
                }
                label={field.label}
                sx={{
                  gridColumn: "1 / -1"
                }}
              />
            );
          }

          return (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={form[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              multiline={field.multiline}
              minRows={field.multiline ? 3 : 1}
              fullWidth
              sx={{
                gridColumn: field.fullWidth
                  ? "1 / -1"
                  : "auto",

                "& .MuiOutlinedInput-root": {
                  background: "#0b1220",
                  borderRadius: 2,
                  color: "white"
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    "rgba(255,255,255,0.15)"
                },

                "& .MuiInputLabel-root": {
                  color:
                    "rgba(255,255,255,0.6)"
                }
              }}
            />
          );
        })}
      </Box>

      {/* SAVE BUTTON */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 5
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",
            background:
              "linear-gradient(90deg,#6366f1,#ec4899)"
          }}
        >
          Save Profile
        </Button>
      </Box>
    </Box>
  );
}